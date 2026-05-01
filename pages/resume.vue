<script setup lang="ts">
definePageMeta({ layout: 'default' })

useSeoMeta({
  title: 'Resume Builder',
  description: 'Génération d\'un CV personnalisé via OpenAI',
  robots: 'noindex, nofollow'
})

const password = ref('')
const jobTitle = ref('')
const company = ref('')
const jobDescription = ref('')

const loading = ref(false)
const errorMessage = ref('')
const resume = ref<any>(null)
const target = ref<{ jobTitle: string, company: string } | null>(null)

const toast = useToast()

async function generate () {
  errorMessage.value = ''
  resume.value = null
  target.value = null

  if (!password.value) {
    errorMessage.value = 'Mot de passe requis.'
    return
  }
  if (jobDescription.value.trim().length < 30) {
    errorMessage.value = 'Colle une fiche de poste un peu plus complète.'
    return
  }

  loading.value = true
  try {
    const data = await $fetch<{ resume: any, target: any }>('/api/resume/generate', {
      method: 'POST',
      body: {
        password: password.value,
        jobTitle: jobTitle.value,
        company: company.value,
        jobDescription: jobDescription.value
      }
    })
    resume.value = data.resume
    target.value = data.target
    toast.add({ title: 'CV généré', color: 'green' })
  } catch (err: any) {
    errorMessage.value = err?.statusMessage || err?.data?.statusMessage || 'Erreur inconnue'
  } finally {
    loading.value = false
  }
}

function reset () {
  resume.value = null
  target.value = null
  errorMessage.value = ''
}

function printPage () {
  if (typeof window !== 'undefined') window.print()
}
</script>

<template>
  <div class="resume-shell">
    <UContainer class="no-print py-10">
      <div class="max-w-3xl mx-auto">
        <h1 class="text-3xl font-bold mb-2">Resume Builder</h1>
        <p class="text-gray-600 dark:text-gray-400 mb-6">
          Colle une fiche de poste, je génère un CV optimisé ATS qui matche le job.
        </p>

        <UCard v-if="!resume">
          <form class="space-y-4" @submit.prevent="generate">
            <UFormGroup label="Mot de passe" required>
              <UInput v-model="password" type="password" placeholder="••••••••" autocomplete="current-password" />
            </UFormGroup>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <UFormGroup label="Intitulé du poste">
                <UInput v-model="jobTitle" placeholder="ex: VP Engineering" />
              </UFormGroup>
              <UFormGroup label="Entreprise">
                <UInput v-model="company" placeholder="ex: Acme" />
              </UFormGroup>
            </div>

            <UFormGroup label="Fiche de poste / description du job parfait" required>
              <UTextarea
                v-model="jobDescription"
                :rows="14"
                placeholder="Colle ici la description complète du poste : missions, stack, soft skills, contexte..."
              />
            </UFormGroup>

            <UAlert
              v-if="errorMessage"
              icon="i-heroicons-exclamation-triangle"
              color="red"
              variant="subtle"
              :title="errorMessage"
            />

            <div class="flex items-center gap-3">
              <UButton type="submit" :loading="loading" icon="i-heroicons-sparkles" size="lg">
                Générer mon CV
              </UButton>
              <p v-if="loading" class="text-sm text-gray-500">
                Génération en cours, ça peut prendre 10-30s…
              </p>
            </div>
          </form>
        </UCard>

        <div v-else class="flex flex-wrap items-center gap-3 mb-6">
          <UButton color="gray" variant="soft" icon="i-heroicons-arrow-left" @click="reset">
            Nouvelle génération
          </UButton>
          <UButton icon="i-heroicons-printer" @click="printPage">
            Imprimer / PDF
          </UButton>
          <p v-if="target?.jobTitle || target?.company" class="text-sm text-gray-500 ml-auto">
            Cible : {{ [target?.jobTitle, target?.company].filter(Boolean).join(' @ ') }}
          </p>
        </div>
      </div>
    </UContainer>

    <div v-if="resume" class="resume-output py-8">
      <ResumeView :resume="resume" />
    </div>
  </div>
</template>

<style scoped>
.resume-output {
  background: #f3f4f6;
}

@media print {
  :global(body) {
    background: #fff !important;
  }
  .no-print {
    display: none !important;
  }
  .resume-output {
    background: #fff;
    padding: 0;
  }
  :global(header.u-header),
  :global(.u-header),
  :global(footer) {
    display: none !important;
  }
}
</style>
