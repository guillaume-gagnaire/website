<script setup lang="ts">
const title = 'Expériences professionnelles'
const description = 'Mes expériences en tant que CTO, lead dev et freelance : SaaS, IA générative, plateformes RH, design systems. Bordeaux et remote.'

const { data: experiences } = await useAsyncData('experiences-list', () =>
  queryContent('/experiences').where({ _extension: 'md' }).find()
)

useSeoMeta({
  title,
  ogTitle: title,
  description,
  ogDescription: description
})

defineOgImage({
  component: 'Saas',
  title,
  description,
  headline: 'Expériences'
})
</script>

<template>
  <UContainer>
    <UPageHeader :title="title" :description="description" class="py-12" />

    <UPage>
      <UPageBody>
        <div v-if="experiences && experiences.length" class="space-y-6">
          <ULandingCard
            v-for="exp in experiences"
            :key="exp._path"
            :title="(exp.role ? exp.role + ' — ' : '') + (exp.company || exp.title)"
            :description="exp.description"
            :to="exp._path"
          >
            <template #title>
              <div class="flex flex-wrap items-baseline gap-x-3">
                <span class="font-bold">{{ exp.role || exp.title }}</span>
                <span class="text-primary">{{ exp.company }}</span>
                <span v-if="exp.period" class="text-sm text-gray-500">· {{ exp.period }}</span>
              </div>
            </template>

            <div v-if="exp.tags?.length" class="flex flex-wrap gap-1 mt-3">
              <UBadge
                v-for="tag in exp.tags"
                :key="tag"
                size="xs"
                variant="subtle"
              >
                {{ tag }}
              </UBadge>
            </div>
          </ULandingCard>
        </div>

        <UAlert
          v-else
          icon="i-heroicons-information-circle"
          title="Aucune expérience publiée pour l'instant"
          description="Lance la commande Claude Code /experience dans ce projet pour en ajouter une."
          color="gray"
          variant="subtle"
        />
      </UPageBody>
    </UPage>
  </UContainer>
</template>
