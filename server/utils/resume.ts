import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'

export interface ResumeExperience {
  period: string
  company: string
  location: string
  title: string
  bullets: string[]
  impact: string
  stack?: string[]
  tags?: string[]
}

export interface Resume {
  personal: {
    firstName: string
    lastName: string
    title: string
    email: string
    phone: string
    location: string
    photo: string
  }
  profile: string
  expertise: string[]
  education: { school: string, degree: string, year: string }[]
  languages: { name: string, level: string }[]
  experiences: ResumeExperience[]
  references: string
}

let cached: Resume | null = null

export async function loadResume (): Promise<Resume> {
  if (cached) return cached
  const path = resolve(process.cwd(), 'content/resume.json')
  const raw = await readFile(path, 'utf-8')
  cached = JSON.parse(raw) as Resume
  return cached
}
