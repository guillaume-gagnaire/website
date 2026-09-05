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

const { data: rawProjects } = await useAsyncData('projectList', () =>
  queryContent('/projects').where({ _extension: 'md' }).find()
)

// Tri explicite cote client : le prefixe numerique des fichiers trie en
// lexicographique (1, 10, 11, 2...), et le sort() de Nuxt Content sur un champ
// de frontmatter n'est pas fiable ici. On s'appuie sur la cle 'order'.
const projects = computed(() =>
  [...(rawProjects.value ?? [])].sort((a, b) => (a.order ?? 999) - (b.order ?? 999))
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
const limit = 8
const selectedTag = ref(null)
const freelance = ref(true)
const salarie = ref(true)

const filtered = computed(() => {
  return (projects.value ?? []).filter(
    project =>
      (selectedTag.value === null ||
        tagsEtendus(project.tags).includes(selectedTag.value)) &&
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

// Revenir en page 1 dès qu'un filtre change, sinon on peut se retrouver
// sur une page vide après avoir réduit la liste.
watch([selectedTag, freelance, salarie], () => {
  currentPage.value = 1
})

const tags = computed(() => {
  const ret = []
  for (let project of projects.value ?? []) {
    for (let tag of tagsEtendus(project.tags)) {
      if (ret.includes(tag) === false) ret.push(tag)
    }
  }
  ret.sort()
  return ret
})

function getDescription (item) {
  const tags = tagsEtendus(item.tags).map(a => `#${a}`).join(' ')
  const role = [item.role, item.type].filter(Boolean).join(', ')
  return [item.description, role, tags].filter(Boolean).join(' - ')
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
          class="mr-4 mb-2 cursor-pointer"
          >Toutes les technologies</UBadge
        >
        <UBadge
          size="lg"
          v-for="tag in tags"
          :key="tag"
          :variant="selectedTag === tag ? 'solid' : 'outline'"
          @click="selectedTag = tag"
          class="mr-4 mb-2 cursor-pointer"
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
          :badge="{ label: item.period ?? item.type, color: 'gray', variant: 'subtle' }"
        />
      </UBlogList>

      <p
        v-if="!filtered.length"
        class="my-16 text-center text-gray-500 dark:text-gray-400"
      >
        Aucun projet ne correspond à ce filtre.
      </p>

      <div v-if="filtered.length > limit" class="my-8 flex items-center justify-center">
        <UPagination
          v-model="currentPage"
          :page-count="limit"
          :total="filtered.length"
          size="lg"
        />
      </div>
    </UContainer>
  </div>
</template>
