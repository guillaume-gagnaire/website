<script setup lang="ts">
import { withoutTrailingSlash } from 'ufo'

const route = useRoute()

const { data: post } = await useAsyncData(route.path, () =>
  queryContent(route.path).findOne()
)
if (!post.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Expérience non trouvée',
    fatal: true
  })
}

const { data: surround } = await useAsyncData(
  `${route.path}-surround`,
  () =>
    queryContent('/experiences')
      .where({ _extension: 'md' })
      .without(['body', 'excerpt'])
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

defineOgImage({
  component: 'Saas',
  title,
  description,
  headline: 'Expériences'
})
</script>

<template>
  <UContainer v-if="post">
    <UPageHeader :title="post.title" :description="post.description">
      <template #headline>
        <div class="flex flex-wrap items-baseline gap-x-3 text-sm">
          <UBadge v-if="post.period" :label="post.period" variant="subtle" />
          <span v-if="post.company" class="font-semibold">{{ post.company }}</span>
          <span v-if="post.location" class="text-gray-500">· {{ post.location }}</span>
        </div>
      </template>

      <div v-if="post.stack?.length" class="flex flex-wrap gap-1 mt-4">
        <UBadge
          v-for="s in post.stack"
          :key="s"
          size="xs"
          color="gray"
          variant="solid"
        >
          {{ s }}
        </UBadge>
      </div>
    </UPageHeader>

    <UPage>
      <UPageBody prose>
        <ContentRenderer v-if="post.body" :value="post" />

        <hr v-if="surround?.length">
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
