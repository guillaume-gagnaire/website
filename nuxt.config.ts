// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: [process.env.NUXT_UI_PRO_PATH || '@nuxt/ui-pro'],
  modules: [
    '@nuxt/content',
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxt/fonts',
    '@nuxthq/studio',
    '@vueuse/nuxt',
    'nuxt-og-image',
    '@nuxthq/studio'
  ],
  hooks: {
    // Define `@nuxt/ui` components as global to use them in `.md` (feel free to add those you need)
    'components:extend': components => {
      const globals = components.filter(c => ['UButton'].includes(c.pascalName))

      globals.forEach(c => (c.global = true))
    }
  },
  ui: {
    icons: ['heroicons', 'simple-icons']
  },
  // GitHub Pages ne sert que des fichiers statiques : l'endpoint /_ipx n'existe
  // pas et seules les images referencees par une page prerendue sont generees.
  // La liste des projets n'affiche que la page 1 au prerender, donc les visuels
  // des pages suivantes renvoyaient des 404. Les cartes sont deja aux bonnes
  // dimensions dans public/, on sert donc directement l'URL d'origine.
  image: {
    provider: 'none'
  },
  routeRules: {
    '/api/search.json': { prerender: true },
    '/docs': { redirect: '/docs/getting-started', prerender: false }
  },
  devtools: {
    enabled: true
  }
})
