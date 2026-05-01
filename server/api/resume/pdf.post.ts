import { buildResumePdf } from '~/server/utils/resumePdf'
import type { Resume } from '~/server/utils/resume'

interface Body {
  password?: string
  resume?: Resume
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  if (!config.resumePassword) {
    throw createError({ statusCode: 500, statusMessage: 'Resume password not configured' })
  }

  const body = await readBody<Body>(event)
  const password = (body?.password || '').trim()
  if (password !== config.resumePassword) {
    throw createError({ statusCode: 401, statusMessage: 'Mot de passe invalide' })
  }
  if (!body?.resume) {
    throw createError({ statusCode: 400, statusMessage: 'Resume manquant' })
  }

  const pdf = await buildResumePdf(body.resume)
  setHeader(event, 'Content-Type', 'application/pdf')
  setHeader(event, 'Content-Disposition', 'attachment; filename="cv-guillaume-gagnaire.pdf"')
  setHeader(event, 'Content-Length', String(pdf.length))
  return pdf
})
