<script setup lang="ts">
const { data: page } = await useAsyncData('parcours', () =>
  queryContent('/parcours').findOne()
)
if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found',
    fatal: true
  })
}

useSeoMeta({
  title: page.value.title,
  ogTitle: page.value.title,
  description: page.value.description,
  ogDescription: page.value.description
})

defineOgImage({
  component: 'Saas',
  title: page.value.title,
  description: page.value.description
})
</script>

<template>
  <div v-if="page">
    <UContainer>
      <ULandingHero
        :title="page.hero.title"
        :description="page.hero.description"
        :links="page.hero.links"
      />

      <!-- Quelques chiffres qui résument 15 ans, avant le détail chronologique. -->
      <dl
        v-if="page.stats?.items?.length"
        class="grid grid-cols-2 lg:grid-cols-4 gap-px overflow-hidden rounded-xl bg-gray-200 dark:bg-gray-800 border border-gray-200 dark:border-gray-800 mb-16"
      >
        <div
          v-for="(stat, index) in page.stats.items"
          :key="index"
          class="bg-white dark:bg-gray-900 px-4 py-8 text-center"
        >
          <dt class="text-3xl font-bold text-primary-500">
            {{ stat.value }}
          </dt>
          <dd class="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {{ stat.label }}
          </dd>
        </div>
      </dl>

      <ol class="relative border-l border-gray-200 dark:border-gray-800 ml-3 mb-16">
        <li
          v-for="(item, index) in page.timeline"
          :key="index"
          class="mb-12 ml-8"
        >
          <span
            class="absolute -left-3 flex items-center justify-center w-6 h-6 rounded-full bg-primary-100 dark:bg-primary-900 ring-8 ring-white dark:ring-gray-900"
          >
            <UIcon
              :name="item.icon ?? 'i-heroicons-briefcase'"
              class="w-3.5 h-3.5 text-primary-600 dark:text-primary-400"
            />
          </span>

          <div class="flex flex-wrap items-center gap-2 mb-2">
            <time class="text-sm font-medium text-gray-500 dark:text-gray-400">
              {{ item.period }}
            </time>
            <UBadge
              v-if="item.type"
              :label="item.type"
              variant="subtle"
              size="xs"
            />
          </div>

          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
            {{ item.role }}
            <span class="text-primary-500">· {{ item.company }}</span>
          </h3>

          <p
            v-if="item.location"
            class="mt-1 text-sm text-gray-500 dark:text-gray-400"
          >
            {{ item.location }}
          </p>

          <p class="mt-2 text-gray-600 dark:text-gray-300">
            {{ item.description }}
          </p>

          <UButton
            v-if="item.to"
            :to="item.to"
            variant="link"
            color="primary"
            size="sm"
            trailing-icon="i-heroicons-arrow-right-20-solid"
            class="mt-2 !px-0"
            label="Voir le projet"
          />
        </li>
      </ol>
    </UContainer>

    <ULandingSection>
      <ULandingCTA
        v-bind="page.cta"
        class="bg-primary-300/50 dark:bg-primary-500/80"
      />
    </ULandingSection>
  </div>
</template>
