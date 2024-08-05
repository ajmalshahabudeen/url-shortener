<template>
  <div class="flex justify-center items-center min-h-[60vh] md:min-h-[90vh]">
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
          :onclick="
            () => {
              if (url_value.length > 0) {
                console.log(url_value);
              } else if (url_value.length === 0) {
                console.log('no value');
                no_value = true;
              }
            }
          "
          color="primary"
          variant="solid"
          icon="material-symbols:kid-star-outline-sharp"
          class="font-extralight text-xl p-3"
        />
      </div>
      <p v-if="no_value" class="absolute text-orange-500 pt-4">Please enter URL</p>
    </UContainer>
  </div>
</template>

<script lang="ts" setup>
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
</script>

<style></style>
