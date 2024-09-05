<template>
  <div class="min-h-[60vh] flex">
    <p class="text-4xl inline-flex items-center gap-3 m-auto" v-if="!Url">
      <!-- {{ route.params.key }} -->
      <!-- {{ Url }} -->
        Loading 
        <Icon name="svg-spinners:180-ring-with-bg" />
    </p>
    <p v-if="Url" class="text-4xl flex flex-col gap-7 items-center m-auto">
      <span class="text-primary">Redirecting to</span> <span @click="copyTextToClipboard(Url)" class="border border-dashed p-3 overflow-y-scroll max-w-[90vw] truncate"> {{ Url }} </span>
      <p class="text-sm text-center -translate-y-5">click the above link to copy</p>
      <p class="text-sm text-center -translate-y-10">Will automatically redirect in 5 seconds</p>
      <Icon name="svg-spinners:blocks-shuffle-2" class="text-green-700" />
    </p>
    <div class="min-w-full min-h-14 fixed bottom-0">
      <Adsbygoogle />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { GetShortUrl } from '~/utils/actions/url/UrlActions';
import copyTextToClipboard from "copy-text-to-clipboard";

const route = useRoute()
const Url = ref(null)
const ready = ref(false)

onMounted(() => {
  fetchUrl()
  const interval = setInterval(() => {
    ready.value = true
    clearInterval(interval)
  }, 5000)
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