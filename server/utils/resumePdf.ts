import PDFDocument from 'pdfkit'
import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import type { Resume } from './resume'

const ORANGE = '#ED682E'
const TEXT = '#1F2937'
const MUTED = '#4B5563'
const LIGHT = '#D1D5DB'

const SIDEBAR_W = 200

export async function buildResumePdf (resume: Resume): Promise<Buffer> {
  const doc = new PDFDocument({ size: 'A4', margin: 0, bufferPages: true })
  const chunks: Buffer[] = []
  doc.on('data', (c) => chunks.push(c as Buffer))
  const done = new Promise<Buffer>((res, rej) => {
    doc.on('end', () => res(Buffer.concat(chunks)))
    doc.on('error', rej)
  })

  const PAGE_W = doc.page.width
  const PAGE_H = doc.page.height

  let pageIndex = 0
  const drawSidebarBg = () => {
    doc.save()
    doc.rect(0, 0, SIDEBAR_W, PAGE_H).fill(ORANGE)
    doc.restore()
  }
  drawSidebarBg()
  doc.on('pageAdded', () => {
    pageIndex++
    drawSidebarBg()
  })

  // ----- Sidebar (page 1) -----
  try {
    const photoRel = (resume.personal.photo || '').replace(/^\//, '')
    if (photoRel) {
      const photoPath = resolve(process.cwd(), 'public', photoRel)
      const buf = await readFile(photoPath)
      const cx = SIDEBAR_W / 2
      const cy = 95
      const r = 60
      doc.save()
      doc.circle(cx, cy, r).clip()
      doc.image(buf, cx - r, cy - r, { width: r * 2, height: r * 2 })
      doc.restore()
    }
  } catch { /* photo optional */ }

  let sy = 180
  const SX = 18
  const SW = SIDEBAR_W - 36

  const sTitle = (text: string) => {
    doc.fillColor('white').font('Helvetica-Bold').fontSize(12).text(text, SX, sy, { width: SW })
    sy = doc.y + 4
  }
  const sLine = (text: string) => {
    doc.fillColor('white').font('Helvetica').fontSize(8.5).text(text, SX, sy, { width: SW })
    sy = doc.y + 1
  }
  const sBullet = (text: string) => {
    const startY = sy
    doc.circle(SX + 2, startY + 4, 1.5).fill('white')
    doc.fillColor('white').font('Helvetica').fontSize(8.5).text(text, SX + 9, startY, { width: SW - 9 })
    sy = doc.y + 1
  }

  sTitle('Contact')
  sLine(resume.personal.email)
  sLine(resume.personal.phone)
  sLine(resume.personal.location)

  if (resume.education?.length) {
    sy += 8
    sTitle('Education')
    for (const e of resume.education) {
      sBullet(`${e.school}\n${e.degree}\n${e.year}`)
      sy += 2
    }
  }

  if (resume.expertise?.length) {
    sy += 8
    sTitle('Expertise')
    for (const skill of resume.expertise) {
      sBullet(skill)
    }
  }

  if (resume.languages?.length) {
    sy += 8
    sTitle('Langues')
    for (const lang of resume.languages) {
      sLine(`${lang.name} - ${lang.level}`)
    }
  }

  if (resume.references) {
    sy += 8
    sTitle('Références')
    sLine(resume.references)
  }

  // ----- Right column -----
  const RX = SIDEBAR_W + 28
  const RW = PAGE_W - RX - 28
  let ry = 50

  doc.fillColor(ORANGE).font('Helvetica').fontSize(30).text(resume.personal.firstName, RX, ry, { width: RW })
  ry = doc.y - 4
  doc.fillColor(ORANGE).font('Helvetica-Bold').fontSize(30).text(resume.personal.lastName.toUpperCase(), RX, ry, { width: RW })
  ry = doc.y + 4

  doc.fillColor(MUTED).font('Helvetica').fontSize(11).text(resume.personal.title, RX, ry, { width: RW })
  ry = doc.y + 14

  doc.fillColor(ORANGE).font('Helvetica-Bold').fontSize(14).text('Profil', RX, ry, { width: RW })
  ry = doc.y + 5
  doc.fillColor(TEXT).font('Helvetica').fontSize(9.5)
  for (const para of resume.profile.split(/\n\n+/)) {
    doc.text(para, RX, ry, { width: RW, align: 'justify' })
    ry = doc.y + 5
  }
  ry += 4

  doc.fillColor(ORANGE).font('Helvetica-Bold').fontSize(14).text('Expériences notables', RX, ry, { width: RW })
  ry = doc.y + 8

  const lineX = RX + 5
  const TX = RX + 18
  const TW = RW - 18

  const dots: { page: number, y: number }[] = []

  for (const exp of resume.experiences) {
    if (ry > PAGE_H - 80) {
      doc.addPage()
      ry = 50
    }
    const dotY = ry
    const dotPage = pageIndex

    doc.fillColor(TEXT).font('Helvetica').fontSize(8.5).text(exp.period, TX, ry, { width: TW })
    ry = doc.y + 1
    if (exp.company) {
      const line = exp.location ? `${exp.company} | ${exp.location}` : exp.company
      doc.fillColor(TEXT).font('Helvetica').fontSize(8.5).text(line, TX, ry, { width: TW })
      ry = doc.y + 3
    }
    doc.fillColor(TEXT).font('Helvetica-Bold').fontSize(11).text(exp.title, TX, ry, { width: TW })
    ry = doc.y + 4

    if (exp.bullets?.length) {
      doc.fillColor(TEXT).font('Helvetica').fontSize(9)
      for (const b of exp.bullets) {
        doc.text('•  ' + b, TX, ry, { width: TW, lineGap: 1 })
        ry = doc.y + 1
      }
    }

    if (exp.impact) {
      ry += 2
      doc.fillColor(TEXT).font('Helvetica-Bold').fontSize(9).text('Impact : ' + exp.impact, TX, ry, { width: TW })
      ry = doc.y + 10
    } else {
      ry += 8
    }

    dots.push({ page: dotPage, y: dotY })
  }

  // Timeline line + dots, drawn per page so multi-page doesn't break
  doc.flushPages()
  const range = doc.bufferedPageRange()
  const byPage = new Map<number, number[]>()
  for (const d of dots) {
    if (!byPage.has(d.page)) byPage.set(d.page, [])
    byPage.get(d.page)!.push(d.y)
  }
  for (const [page, ys] of byPage) {
    doc.switchToPage(range.start + page)
    if (ys.length > 1) {
      doc.lineWidth(0.8).strokeColor(LIGHT)
      doc.moveTo(lineX, ys[0] + 5).lineTo(lineX, ys[ys.length - 1] + 5).stroke()
    }
    for (const py of ys) {
      doc.lineWidth(1.2)
      doc.circle(lineX, py + 5, 3.5).fillAndStroke('white', ORANGE)
    }
  }

  doc.end()
  return done
}
