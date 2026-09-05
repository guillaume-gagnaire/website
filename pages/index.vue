<script setup lang="ts">
const { data: page } = await useAsyncData('index', () =>
  queryContent('/').findOne()
)
if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found',
    fatal: true
  })
}

useSeoMeta({
  titleTemplate: '',
  title: page.value.title,
  ogTitle: page.value.title,
  description: page.value.description,
  ogDescription: page.value.description
})
</script>

<template>
  <div v-if="page">
    <ULandingHero
      :title="page.hero.title"
      :description="page.hero.description"
      :links="page.hero.links"
    >
      <div
        class="absolute inset-0 landing-grid z-[-1] [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
      />

      <template #headline>
        <UBadge
          v-for="(link, idx) in page.hero.headline"
          :key="idx"
          variant="subtle"
          size="lg"
          class="relative rounded-full font-semibold mx-2"
        >
          <NuxtLink
            :to="link.to"
            target="_blank"
            class="focus:outline-none"
            tabindex="-1"
          >
            <span class="absolute inset-0" aria-hidden="true" />
          </NuxtLink>

          {{ link.label }}

          <UIcon
            v-if="link.icon"
            :name="link.icon"
            class="ml-1 w-4 h-4 pointer-events-none"
          />
        </UBadge>
      </template>
    </ULandingHero>

    <ULandingSection class="!pt-0">
      <Avatar />
    </ULandingSection>

    <ULandingSection
      v-for="(section, index) in page.sections"
      :key="index"
      :headline="section.headline"
      :title="section.title"
      :description="section.description"
      :align="section.align"
      :features="section.features"
    >
      <div
        class="rounded-xl bg-gg-300/40 dark:bg-gg-600/40 p-8 h-full flex flex-col justify-center gap-8"
      >
        <div v-for="(stat, i) in section.stats" :key="i">
          <p class="text-3xl sm:text-4xl font-bold text-primary-600 dark:text-primary-400">
            {{ stat.value }}
          </p>
          <p class="mt-1 text-sm text-gray-600 dark:text-gray-300">
            {{ stat.label }}
          </p>
        </div>
      </div>
    </ULandingSection>

    <ULandingSection
      :title="page.features.title"
      :description="page.features.description"
    >
      <UPageGrid>
        <ULandingCard
          v-for="(item, index) in page.features.items"
          :key="index"
          v-bind="item"
        />
      </UPageGrid>
    </ULandingSection>

    <ULandingSection
      :headline="page.testimonials.headline"
      :title="page.testimonials.title"
      :description="page.testimonials.description"
    >
      <UPageColumns class="xl:columns-3">
        <div
          v-for="(testimonial, index) in page.testimonials.items"
          :key="index"
          class="break-inside-avoid"
        >
          <ULandingTestimonial
            v-bind="testimonial"
            class="bg-gg-300/50 dark:bg-gg-600/50"
          />
        </div>
      </UPageColumns>
    </ULandingSection>

    <ULandingSection>
      <ULandingCTA
        v-bind="page.cta"
        class="bg-primary-300/50 dark:bg-primary-500/80"
      />
    </ULandingSection>
  </div>
</template>

<style scoped>
.landing-grid {
  background-size: 42px 42px;
  background-image: linear-gradient(
      to right,
      rgb(var(--color-primary-200)) 1px,
      transparent 1px
    ),
    linear-gradient(
      to bottom,
      rgb(var(--color-primary-200)) 1px,
      transparent 1px
    );
}
.dark {
  .landing-grid {
    background-image: linear-gradient(
        to right,
        rgb(var(--color-primary-800)) 1px,
        transparent 1px
      ),
      linear-gradient(
        to bottom,
        rgb(var(--color-primary-800)) 1px,
        transparent 1px
      );
  }
}
</style>
