<script setup lang="ts">

const userEmail = ref("");
const loggedIn = ref(false);
const SignLabel = ref("");

onMounted(() => {
  userEmail.value = sessionStorage.getItem("user_email") || "anonymous";
  if (userEmail.value !== "anonymous") {
    SignLabel.value = "Sign out";
    loggedIn.value = true;
  } else {
    SignLabel.value = "Sign in";
    loggedIn.value = false;
  }
})

const items = [
  [
    {
      label: userEmail,
      slot: "account",
      disabled: true,
    },
  ],
  [
    {
      label: "Credits",
      icon: "i-heroicons-cog-8-tooth",
    },
  ],
  [
    {
      label: "Documentation",
      icon: "i-heroicons-book-open",
    },
    {
      label: "Changelog",
      icon: "i-heroicons-megaphone",
    },
    {
      label: "Status",
      icon: "i-heroicons-signal",
    },
  ],
  [
    {
      label: SignLabel,
      icon: "heroicons-outline:arrow-left-on-rectangle",
    },
  ],
];


</script>

<template>
  <UDropdown
    :items="items"
    :ui="{ item: { disabled: 'cursor-text select-text' } }"
    :popper="{ placement: 'bottom-start' }"
  >
    <div class="hover:opacity-75 pt-2">
      <Icon name="line-md:account" size="24" />
    </div>

    <template #account="{ item }">
      <div class="text-left">
        <p>Signed in as</p>
        <p class="truncate font-medium text-gray-900 dark:text-white">
          {{ item.label }}
        </p>
      </div>
    </template>

    <template #item="{ item }">
      <span class="truncate">{{ item.label }}</span>

      <UIcon
        :name="item.icon"
        class="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500 ms-auto"
      />
    </template>
  </UDropdown>
</template>
