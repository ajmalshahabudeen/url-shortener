<template>
  <div
    class="flex flex-col gap-10 justify-center items-center min-h-[60vh] md:min-h-[90vh]"
  >
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
          :onclick="() => createUrl()"
          color="primary"
          variant="solid"
          icon="material-symbols:kid-star-outline-sharp"
          class="font-extralight text-xl p-3"
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
        <p class="border border-dashed py-2 px-5 rounded-lg">
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

watch(data, () => {
  if (data.value) {
    shortUrl.value = "localhost:3000/" + data.value;
  }
});

const createUrl = async () => {
  if (url_value.value) {
    // console.log(url_value.value);
    const res = await CreateShortUrl(url_value.value);
    console.log(res);
    if (res) {
      data.value = res;
    }
  } else {
    console.log("no value");
    no_value.value = true;
  }
};
</script>

<style></style>
