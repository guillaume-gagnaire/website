<script setup lang="ts">
import type { NavItem } from '@nuxt/content/dist/runtime/types'

const navigation = inject<Ref<NavItem[]>>('navigation', ref([]))

const links = [
  {
    label: 'Projets',
    to: '/projects'
  },
  {
    label: 'Blog',
    to: '/blog'
  },
  {
    label: 'Contact',
    to: '/contact'
  }
]
</script>

<template>
  <UHeader :links="links">
    <template #logo>
      <img src="/logo.svg" alt="Guillaume Gagnaire" style="height: 42px" />
    </template>

    <template #right>
      <UButton label="Hire me" color="primary" to="/contact" />
    </template>

    <template #panel>
      <UNavigationTree :links="mapContentNavigation(navigation)" default-open />
    </template>
  </UHeader>
</template>
