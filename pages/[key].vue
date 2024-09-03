<template>
  <div class="min-h-[60vh] flex">
    <p class="text-4xl inline-flex items-center gap-3 m-auto" v-if="!Url">
      <!-- {{ route.params.key }} -->
      <!-- {{ Url }} -->
        Loading 
        <Icon name="svg-spinners:180-ring-with-bg" />
    </p>
    <p v-if="Url" class="text-4xl flex flex-col md:flex-row gap-7 items-center m-auto">
      Redirecting to <span class="border border-dashed p-3"> {{ Url }} </span>
      <Icon name="svg-spinners:blocks-shuffle-2" />
    </p>
    <div class="min-w-full min-h-14 fixed bottom-0">
      <Adsbygoogle />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { GetShortUrl } from '~/utils/actions/url/UrlActions';

const route = useRoute()
const Url = ref(null)
const ready = ref(false)

onMounted(() => {
  fetchUrl()
  const interval = setInterval(() => {
    ready.value = true
    clearInterval(interval)
  }, 3000)
})

watch(ready, () => {
  if (Url.value) {
    let url = SecureUrl(Url.value)
    navigateTo(url, { external: true })
  }
})

const fetchUrl = async () => {
  const key = route.params.key as string
  const url = await GetShortUrl(key)
  Url.value = url
  // console.log(url)
}

const SecureUrl = (val:string) => {

  const http = "http"
  const https = "https"

  if (val.startsWith(http)) {
    return val
  } else if (val.startsWith(https)) {
    return val
  } else {
    return http + "://" + val
  }

}

</script>

<style>

</style>