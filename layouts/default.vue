<template>
  <div>
    <Header />
    <slot />
  </div>
</template>

<script lang="ts" setup>

useHead({
  title: 'Url Shortener',
  meta: [
    { name: 'description', content: 'Shorten your urls' },
    { name: 'google-adsense-account', content: 'ca-pub-1356961589183474' },
  ]
})

</script>

<style>

</style>