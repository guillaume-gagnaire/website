<script setup>
const { data: page } = await useAsyncData('projects', () =>
  queryContent('/projects').findOne()
)
if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found',
    fatal: true
  })
}

const { data: projects } = await useAsyncData('projectList', () =>
  queryContent('/projects').where({ _extension: 'md' }).find()
)

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

const route = useRoute()
const currentPage = ref(+(route.query.page ?? 1))
const limit = 5
const selectedTag = ref(null)
const freelance = ref(true)
const salarie = ref(true)

const filtered = computed(() => {
  return (projects.value ?? []).filter(
    project =>
      (selectedTag.value === null ||
        (project.tags ?? []).includes(selectedTag.value)) &&
      ((project.freelance && freelance.value) ||
        (project.salarie && salarie.value))
  )
})

const projectList = computed(() => {
  return filtered.value.slice(
    (currentPage.value - 1) * limit,
    currentPage.value * limit
  )
})

const tags = computed(() => {
  const ret = []
  for (let project of projects.value ?? []) {
    for (let tag of project.tags ?? []) {
      if (ret.includes(tag) === false) ret.push(tag)
    }
  }
  ret.sort()
  return ret
})

function getDescription (item) {
  return `${item.description} ${item.tags.map(a => `#${a}`).join(' ')}`
}
</script>

<template>
  <div v-if="page">
    <UContainer>
      <ULandingHero
        :title="page.hero.title"
        :description="page.hero.description"
        :links="page.hero.links"
      ></ULandingHero>

      <div class="search-form">
        <UBadge
          size="lg"
          :variant="selectedTag === null ? 'solid' : 'outline'"
          @click="selectedTag = null"
          class="mr-4"
          >Toutes les technologies</UBadge
        >
        <UBadge
          size="lg"
          v-for="tag in tags"
          :key="tag"
          :variant="selectedTag === tag ? 'solid' : 'outline'"
          @click="selectedTag = tag"
          class="mr-4"
          >{{ tag }}</UBadge
        >
        <div class="flex items-start justify-start mt-4 gap-4">
          <UCheckbox v-model="freelance" name="freelance" label="Freelance" />
          <UCheckbox v-model="salarie" name="salarie" label="Salarié" />
        </div>
      </div>

      <UDivider label="" class="my-12" />

      <UBlogList orientation="vertical">
        <UBlogPost
          v-for="(item, idx) in projectList"
          :key="idx"
          :to="item._path"
          :title="item.title"
          :description="getDescription(item)"
          :image="item.image"
          orientation="horizontal"
          :badge="{ label: item.type }"
        />
      </UBlogList>
      <div class="my-8 flex items-center justify-center">
        <UPagination
          v-model="currentPage"
          :page-count="limit"
          :total="filtered.length"
          size="lg"
        />
      </div>
    </UContainer>
    <!-- 
    <UContainer>
      <UPricingGrid>
        <UPricingCard
          v-for="(plan, index) in page.plans"
          :key="index"
          v-bind="plan"
          :price="isYearly ? plan.price.year : plan.price.month"
          :cycle="isYearly ? '/year' : '/month'"
        />
      </UPricingGrid>
    </UContainer>

    <ULandingSection>
      <ULandingLogos>
        <UIcon
          v-for="icon in page.logos.icons"
          :key="icon"
          :name="icon"
          class="w-12 h-12 flex-shrink-0 text-gray-500 dark:text-gray-400"
        />
      </ULandingLogos>
    </ULandingSection>

    <ULandingSection
      :title="page.faq.title"
      :description="page.faq.description"
    >
      <ULandingFAQ
        :items="page.faq.items"
        multiple
        default-open
        class="max-w-4xl mx-auto"
      />
    </ULandingSection> -->
  </div>
</template>
