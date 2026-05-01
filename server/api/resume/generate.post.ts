import OpenAI from 'openai'
import { loadResume } from '~/server/utils/resume'

interface Body {
  password?: string
  jobDescription?: string
  jobTitle?: string
  company?: string
}

const SYSTEM_PROMPT = `Tu es un expert en rédaction de CV optimisés ATS pour des profils tech senior (CTO, Lead Dev).

On te donne :
1. Le profil JSON de Guillaume Gagnaire (expériences réelles, compétences, formation).
2. Une fiche de poste cible.

Ta mission : produire un CV personnalisé qui matche au mieux la fiche de poste, sans inventer aucune expérience, formation ou compétence absente du profil source.

Règles strictes :
- Garde EXACTEMENT la même structure JSON que le profil source (mêmes clés, même nombre d'expériences, mêmes périodes/entreprises/postes).
- Tu peux REFORMULER : le profil ("profile"), les bullets et "impact" de chaque expérience, et le titre du poste (légères variations) — toujours en gardant les FAITS et chiffres réels.
- Pour les bullets : reformule pour faire ressortir les mots-clés et compétences cités dans la fiche de poste, sans mentir. Si une bullet n'est pas pertinente, tu peux la raccourcir mais pas l'inventer.
- Réordonne / sélectionne les compétences "expertise" pour mettre en avant celles qui matchent la fiche de poste (max 8). Tu peux légèrement renommer (ex: "VueJS / Angular" -> "VueJS / Nuxt") UNIQUEMENT si c'est cohérent avec le profil source.
- Les compétences/technos non mentionnées dans le profil source ne doivent PAS apparaître.
- Le profil ("profile") fait 2 paragraphes max, accroche directe, mots-clés ATS visibles, ton sobre, première personne.
- Adapte le titre principal ("personal.title") au poste cible si pertinent (ex: "CTO" -> "CTO / VP Engineering").
- Réponds UNIQUEMENT avec un objet JSON conforme au schéma, en français, sans markdown ni texte additionnel.`

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  if (!config.resumePassword) {
    throw createError({ statusCode: 500, statusMessage: 'Resume password not configured on the server' })
  }
  if (!config.openaiApiKey) {
    throw createError({ statusCode: 500, statusMessage: 'OpenAI API key not configured on the server' })
  }

  const body = await readBody<Body>(event)
  const password = (body?.password || '').trim()
  const jobDescription = (body?.jobDescription || '').trim()
  const jobTitle = (body?.jobTitle || '').trim()
  const company = (body?.company || '').trim()

  if (password !== config.resumePassword) {
    throw createError({ statusCode: 401, statusMessage: 'Mot de passe invalide' })
  }
  if (!jobDescription || jobDescription.length < 30) {
    throw createError({ statusCode: 400, statusMessage: 'La fiche de poste est trop courte' })
  }

  const resume = await loadResume()

  const userPayload = {
    sourceProfile: resume,
    target: {
      jobTitle: jobTitle || null,
      company: company || null,
      jobDescription
    }
  }

  const openai = new OpenAI({ apiKey: config.openaiApiKey })

  let completion
  try {
    completion = await openai.chat.completions.create({
      model: config.openaiModel,
      response_format: { type: 'json_object' },
      temperature: 0.4,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: JSON.stringify(userPayload) }
      ]
    })
  } catch (err: any) {
    throw createError({ statusCode: 502, statusMessage: `Erreur OpenAI: ${err?.message || 'inconnue'}` })
  }

  const raw = completion.choices?.[0]?.message?.content
  if (!raw) {
    throw createError({ statusCode: 502, statusMessage: 'Réponse OpenAI vide' })
  }

  let generated: any
  try {
    generated = JSON.parse(raw)
  } catch {
    throw createError({ statusCode: 502, statusMessage: 'Réponse OpenAI mal formée' })
  }

  return {
    resume: mergeResume(resume, generated),
    target: { jobTitle, company },
    usage: completion.usage
  }
})

function mergeResume (source: any, generated: any) {
  return {
    personal: { ...source.personal, ...(generated.personal || {}) },
    profile: typeof generated.profile === 'string' && generated.profile.length > 0 ? generated.profile : source.profile,
    expertise: Array.isArray(generated.expertise) && generated.expertise.length > 0 ? generated.expertise : source.expertise,
    education: source.education,
    languages: source.languages,
    experiences: Array.isArray(generated.experiences) && generated.experiences.length === source.experiences.length
      ? generated.experiences.map((exp: any, i: number) => ({
          ...source.experiences[i],
          title: exp.title || source.experiences[i].title,
          bullets: Array.isArray(exp.bullets) && exp.bullets.length > 0 ? exp.bullets : source.experiences[i].bullets,
          impact: typeof exp.impact === 'string' ? exp.impact : source.experiences[i].impact
        }))
      : source.experiences,
    references: source.references
  }
}
