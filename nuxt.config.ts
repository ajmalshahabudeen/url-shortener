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
  runtimeConfig: {
    public: {
      baseUrl: process.env.NUXT_PUBLIC_PR_URL || "http://localhost:3001/",
    },
  },

  site: {
    url: process.env.NUXT_PUBLIC_SITE_URL || "https://www.urlz.in",
  },

  modules: [
    "@nuxt/ui",
    "@pinia/nuxt",
    "@nuxtjs/google-adsense",
    "@nuxtjs/sitemap",
    "@nuxtjs/robots",
  ],

  sitemap: {
    exclude: ["/dashboard/**"],
  },

  robots: {
    allow: "/",
    sitemap: "/sitemap.xml",
  },

  googleAdsense: {
    id: "ca-pub-1356961589183474",
    pageLevelAds: true,
    onPageLoad: true,
    overlayBottom: true,
  },
});
