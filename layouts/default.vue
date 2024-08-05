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
    { name: 'description', content: 'Shorten your urls' }
  ]
})

</script>

<style>

</style>