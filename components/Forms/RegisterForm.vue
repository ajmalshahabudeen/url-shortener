<script setup lang="ts">
import { z } from "zod";
import type { FormSubmitEvent } from "#ui/types";
import { RegisterUtil } from "~/utils/actions/user/RegisterUtil";

const schema = z.object({
  name: z.string().min(3, "Must be at least 3 characters"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(10, "Must be at least 10 characters"),
  password: z.string().min(8, "Must be at least 8 characters"),
});

type Schema = z.output<typeof schema>;

const state = reactive({
  name: undefined,
  email: undefined,
  phone: undefined,
  password: undefined,
});

const success = ref(false);
const error = ref(false);

async function onSubmit(event: FormSubmitEvent<Schema>) {
  // Do something with data
  // console.log(event.data)
  const values = event.data;
  const res = await RegisterUtil(values);
  if (res) {
    success.value = true;
    error.value = false;
  } else {
    success.value = false;
    error.value = true;
  }
}

watch(success, () => {
  clearStuff();
});
watch(error, () => {
  clearStuff();
});

const clearStuff = () => {
  state.name = undefined;
  state.email = undefined;
  state.phone = undefined;
  state.password = undefined;
  const interval = setInterval(() => {
    success.value = false;
    error.value = false;
    clearInterval(interval);
  }, 3000);
};
</script>

<!-- Gotta add password confirmation and email existence -->

<template>
  <div class="border p-10 w-96 rounded-2xl border-b-8">
    <p class="text-2xl pb-10">Creat an account</p>
    <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
      <UFormGroup label="Name" name="name">
        <UInput v-model="state.name" size="xl" autocomplete="off" />
      </UFormGroup>
      <UFormGroup label="Email" name="email">
        <UInput v-model="state.email" size="xl" autocomplete="off" />
      </UFormGroup>
      <UFormGroup label="Phone" name="phone">
        <UInput v-model="state.phone" size="xl" autocomplete="off" />
      </UFormGroup>

      <UFormGroup label="Password" name="password">
        <UInput v-model="state.password" type="password" size="xl" />
      </UFormGroup>

      <UButton type="submit" class="w-full" block size="lg"> Register </UButton>
    </UForm>
    <UDivider label="OR" class="pt-4" />
    <UButton
      to="/user/login"
      label="Login"
      class="w-full mt-3"
      block
      size="lg"
      variant="outline"
    />
    <UAlert
      title="User Registered!"
      class="mt-3 text-green-500 text-center"
      type="warning"
      variant="soft"
      :class="{ hidden: !success }"
    />
    <UAlert
      title="Something went wrong, please try again"
      class="mt-3 text-red-500 text-center"
      type="warning"
      variant="soft"
      :class="{ hidden: !error }"
    />
  </div>
</template>
