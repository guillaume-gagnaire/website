<script setup lang="ts">
const { data: page } = await useAsyncData('services', () =>
  queryContent('/services').findOne()
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
    </UContainer>

    <!-- La phrase qui résume tout : mise en avant, seule, avant les offres. -->
    <ULandingSection class="!pt-0">
      <UContainer>
        <blockquote
          class="max-w-3xl mx-auto rounded-xl bg-primary-300/40 dark:bg-primary-500/60 px-6 py-10 sm:px-10 text-center"
        >
          <p class="text-xl sm:text-2xl font-medium leading-relaxed text-gray-900 dark:text-white">
            {{ page.statement.quote }}
          </p>
          <footer
            v-if="page.statement.author"
            class="mt-6 text-sm text-gray-700 dark:text-gray-200"
          >
            {{ page.statement.author }}
          </footer>
        </blockquote>
      </UContainer>
    </ULandingSection>

    <ULandingSection
      :headline="page.offers.headline"
      :title="page.offers.title"
      :description="page.offers.description"
    >
      <UPageGrid>
        <ULandingCard
          v-for="(item, index) in page.offers.items"
          :key="index"
          v-bind="item"
        />
      </UPageGrid>
    </ULandingSection>

    <ULandingSection
      :headline="page.method.headline"
      :title="page.method.title"
      :description="page.method.description"
      :features="page.method.features"
      align="left"
    >
      <div
        class="rounded-xl bg-gg-300/40 dark:bg-gg-600/40 p-8 h-full flex flex-col justify-center gap-6"
      >
        <div
          v-for="(item, index) in page.method.highlights"
          :key="index"
          class="flex items-start gap-4"
        >
          <UIcon
            :name="item.icon ?? 'i-heroicons-check-circle'"
            class="w-6 h-6 shrink-0 text-primary-600 dark:text-primary-400 mt-0.5"
          />
          <div>
            <p class="font-semibold text-gray-900 dark:text-white">
              {{ item.title }}
            </p>
            <p class="text-sm text-gray-600 dark:text-gray-300">
              {{ item.description }}
            </p>
          </div>
        </div>
      </div>
    </ULandingSection>

    <ULandingSection
      :headline="page.terms.headline"
      :title="page.terms.title"
      :description="page.terms.description"
    >
      <UContainer>
        <dl
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px overflow-hidden rounded-xl bg-gray-200 dark:bg-gray-800 border border-gray-200 dark:border-gray-800"
        >
          <div
            v-for="(item, index) in page.terms.items"
            :key="index"
            class="bg-white dark:bg-gray-900 px-6 py-8 text-center"
          >
            <dt class="text-sm text-gray-500 dark:text-gray-400">
              {{ item.label }}
            </dt>
            <dd class="mt-2 text-lg font-semibold text-gray-900 dark:text-white">
              {{ item.value }}
            </dd>
          </div>
        </dl>
      </UContainer>
    </ULandingSection>

    <ULandingSection>
      <ULandingCTA
        v-bind="page.cta"
        class="bg-primary-300/50 dark:bg-primary-500/80"
      />
    </ULandingSection>
  </div>
</template>
