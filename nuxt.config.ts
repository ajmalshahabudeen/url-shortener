// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  modules: ["@nuxt/ui", "@pinia/nuxt", '@nuxtjs/google-adsense'],
  googleAdsense: {
    id: 'ca-pub-1356961589183474'
  }
});
