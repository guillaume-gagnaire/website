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
  runtimeConfig: {
    resumePassword: process.env.NUXT_RESUME_PASSWORD || '',
    openaiApiKey: process.env.NUXT_OPENAI_API_KEY || '',
    openaiModel: process.env.NUXT_OPENAI_MODEL || 'gpt-4o-mini'
  },
  nitro: {
    externals: {
      external: ['pdfkit', 'fontkit']
    }
  },
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
  routeRules: {
    '/api/search.json': { prerender: true },
    '/docs': { redirect: '/docs/getting-started', prerender: false }
  },
  devtools: {
    enabled: true
  }
})
