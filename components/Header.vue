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
      <img src="/logo.svg" alt="Guillaume Gagnaire" class="logo" />
      <img src="/favicon-32x32.png" alt="GG" class="logo-sm" />
    </template>

    <template #right>
      <UButton label="Hire me" color="primary" to="/contact" />
    </template>

    <template #panel>
      <UNavigationTree :links="mapContentNavigation(navigation)" default-open />
    </template>
  </UHeader>
</template>

<style scoped>
.logo {
  height: 42px;
}

.logo-sm {
  display: none;
}

@media screen and (max-width: 600px) {
  .logo {
    display: none;
  }

  .logo-sm {
    display: block;
  }
}
</style>
