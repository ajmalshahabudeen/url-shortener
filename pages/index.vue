<template>
  <div
    class="flex flex-col gap-10 justify-center items-center min-h-[60vh] md:min-h-[90vh]"
  >
    <UContainer>
      <p class="text-3xl md:text-5xl md:py-10 font-extralight md:text-center">
        <span class="text-primary text-4xl md:text-7xl"> Enter </span> Your Long
        Hell
        <span class="text-primary font-semibold text-4xl md:text-6xl">Url</span>
        Here to <span class="underline underline-offset-8">Short</span> it For
        <span class="text-green-500 text-6xl font-extrabold"> Free </span>
      </p>
    </UContainer>
    <UContainer class="relative">
      <div class="flex items-center gap-5">
        <UInput
          v-model="url_value"
          label="Enter URL"
          color="primary"
          icon="i-heroicons-arrow-right-20-solid"
          variant="outline"
          placeholder="Enter URL"
          size="xl"
          input-class=" md:min-w-[700px]"
          autofocus
        />
        <UButton
          v-if="!loading"
          :onclick="() => createUrl()"
          color="primary"
          variant="solid"
          icon="material-symbols:kid-star-outline-sharp"
          class="font-extralight text-xl p-3"
        />
        <UButton
          v-else
          color="primary"
          variant="solid"
          icon="line-md:loading-twotone-loop"
          class="font-extralight text-xl p-3"
          disabled
        />
      </div>
      <p v-if="no_value" class="absolute text-orange-500 pt-4">
        Please enter URL
      </p>
    </UContainer>

    <div v-if="data">
      <UContainer
        class="bg-gray-100 dark:bg-gray-800 px-10 py-3 flex gap-4 rounded-lg items-center"
      >
        <p class="border border-dashed py-2 px-3 rounded-lg">
          {{ shortUrl }}
        </p>
        <UButton
          @click="
            () => {
              copied = true;
              copyTextToClipboard(shortUrl);
            }
          "
          variant="outline"
          icon="solar:copy-bold-duotone"
        />
      </UContainer>
      <UAlert
        v-if="copied"
        title="copied to clipboard!"
        variant="outline"
        color="green"
        icon="material-symbols:bookmark-check-outline-sharp"
        class="mt-3"
      />
    </div>
    <div class="w-full h-14 fixed bottom-0">
      <Adsbygoogle />
    </div>
  </div>
</template>

<script lang="ts" setup>
import copyTextToClipboard from "copy-text-to-clipboard";
import { CreateShortUrl } from "~/utils/actions/url/UrlActions";

const url_value = ref("");
const no_value = ref(false);

watch(no_value, () => {
  if (no_value.value) {
    const interval = setInterval(() => {
      no_value.value = false;
      clearInterval(interval);
    }, 3000);
  }
});

const data = ref("");
const shortUrl = ref("");
const copied = ref(false);

watch(copied, () => {
  if (copied.value) {
    const interval = setInterval(() => {
      copied.value = false;
      clearInterval(interval);
    }, 3000);
  }
});

const config = useRuntimeConfig();
watch(data, () => {
  if (data.value) {
    const pr_url = config.public.baseUrl;
    shortUrl.value = pr_url + data.value;
  }
});

const loading = ref(false);

const createUrl = async () => {
  loading.value = true;
  if (url_value.value) {
    // console.log(url_value.value);
    const res = await CreateShortUrl(url_value.value);
    // console.log(res);
    if (res) {
      loading.value = false;
      data.value = res;
    }
  } else {
    loading.value = false;
    // console.log("no value");
    no_value.value = true;
  }
};
</script>

<style></style>
