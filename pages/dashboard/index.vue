<template>
  <div class="flex flex-col gap-3">
    <h1 class="text-3xl text-center md:text-start md:pl-20">Dashboard - {{ UserEmail }}</h1>
    <span class="border border-dashed"></span>
    <p v-if="!DataAvailable" class="text-3xl text-center pt-10">No Data Found, Please Add Some</p>
    <div class="flex flex-col w-[90vw] m-auto pt-10 items-stretch gap-3 overflow-y-scroll">
      <template v-for="url, index in urls.data">
        <div class="border border-dashed flex gap-3 p-5 hover:bg-gray-100 dark:hover:bg-gray-900">
          <p class="border-b">{{ index + 1 }}</p>
          <span class="border border-dashed"></span>
          <p>Url: {{ url.url_value }}</p>
          <span class="border border-dashed"></span>
          <p>Short Url: https://url-shorte.vercel.app/{{ url.url_key }}</p>
          <span class="border border-dashed"></span>
          <p>Vistors: {{ url.vistors_count }}</p>
        </div>
      </template>
    </div>
    <!-- <pre>
      {{ urls }}
    </pre> -->
  </div>
</template>

<script lang="ts" setup>
import { GetUserUrls } from '~/utils/actions/url/UrlActions';

interface Urls {
  message: string
  value: boolean
  data: {
    url_key: string
    url_value: string
    date: string
    vistors_count: number
  }[]
}

const urls = ref<Urls>({
  message: '',
  value: false,
  data: []
})
const DataAvailable = ref(false)
const UserEmail = ref("")

onMounted(() => {
  UserEmail.value = sessionStorage.getItem("user_email") || "anonymous"
  fetchData()
})

const fetchData = async () => {
  urls.value = await GetUserUrls()
  if (urls.value.value) {
    DataAvailable.value = true
  } else {
    DataAvailable.value = false
  }
}

</script>

<style>

</style>