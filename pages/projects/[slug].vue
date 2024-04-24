<script setup>
import { withoutTrailingSlash, joinURL } from 'ufo'

const route = useRoute()

const { data: post } = await useAsyncData(route.path, () =>
  queryContent(route.path).findOne()
)
if (!post.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Projet non trouvé',
    fatal: true
  })
}

const { data: surround } = await useAsyncData(
  `${route.path}-surround`,
  () =>
    queryContent('/projects')
      .where({ _extension: 'md' })
      .without(['body', 'excerpt'])
      .sort({ date: -1 })
      .findSurround(withoutTrailingSlash(route.path)),
  { default: () => [] }
)

const title = post.value.head?.title || post.value.title
const description = post.value.head?.description || post.value.description

useSeoMeta({
  title,
  ogTitle: title,
  description,
  ogDescription: description
})

if (post.value.image?.src) {
  const site = useSiteConfig()

  useSeoMeta({
    ogImage: joinURL(site.url, post.value.image.src),
    twitterImage: joinURL(site.url, post.value.image.src)
  })
} else {
  defineOgImage({
    component: 'Saas',
    title,
    description,
    headline: 'Projets'
  })
}

const modalOpened = ref(false)
const modalUrl = ref('')
const modalText = ref('')
</script>

<template>
  <UContainer v-if="post">
    <UPageHeader :title="post.title" :description="post.description">
      <template #headline>
        <UBadge v-bind="{ label: post.type }" variant="subtle" />
      </template>

      <div class="flex flex-wrap items-center gap-3 mt-4">
        <UButton
          v-for="(author, index) in post.authors"
          :key="index"
          :to="author.to"
          color="white"
          target="_blank"
          size="sm"
        >
          <UAvatar v-bind="author.avatar" :alt="author.name" size="2xs" />

          {{ author.name }}
        </UButton>
      </div>
    </UPageHeader>
    <UModal
      v-model="modalOpened"
      :ui="{
        height: 'h-[90vh] md:h-[80vh]',
        width: 'sm:max-w-full w-full m-6 lg:w-[1000px]'
      }"
    >
      <div class="p-4 flex flex-col h-full">
        <div
          :style="{
            background: `#fff url(${modalUrl}) no-repeat center center`,
            backgroundSize: 'contain'
          }"
          class="grow"
        ></div>
        <UAlert :title="modalText" class="mt-4 shrink-0" />
      </div>
    </UModal>
    <UPage>
      <UPageBody prose>
        <div v-if="post && post.images" style="height: 400px">
          <UCarousel
            v-slot="{ item }"
            :items="post.images"
            class="h-full rounded-lg overflow-hidden"
            :ui="{ item: 'basis-full' }"
            arrows
            indicators
          >
            <div
              class="h-[400px] w-full cursor-pointer"
              :style="{
                background: `#fff url(${item.src}) no-repeat center center`,
                backgroundSize: 'contain'
              }"
              draggable="false"
              @click="
                ;(modalUrl = item.src),
                  (modalText = item.title),
                  (modalOpened = true)
              "
            ></div>
          </UCarousel>
        </div>
        <ContentRenderer v-if="post && post.body" :value="post" />

        <hr v-if="surround?.length" />

        <UContentSurround :surround="surround" />
      </UPageBody>

      <template #right>
        <UContentToc
          v-if="post.body && post.body.toc"
          title="Table des matières"
          :links="post.body.toc.links"
        />
      </template>
    </UPage>
  </UContainer>
</template>
