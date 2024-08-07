<script setup lang="ts">
import { z } from "zod";
import type { FormSubmitEvent } from "#ui/types";
import { LoginUtil } from "~/utils/actions/user/LoginUtil";

const schema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Must be at least 8 characters"),
});

type Schema = z.output<typeof schema>;

const state = reactive({
  email: undefined,
  password: undefined,
});

async function onSubmit(event: FormSubmitEvent<Schema>) {
  // Do something with data
  // console.log(event.data)
  const values = event.data;
  const res: any = await LoginUtil(values);
  if (res.status) {
    success.value = true;
    error.value = false;
    console.log(res.data.user_email);
    sessionStorage.setItem("user_email", res.data.user_email);
  } else {
    success.value = false;
    error.value = true;
  }
}

const success = ref(false);
const error = ref(false);

watch(success, () => {
  clearStuff();
});
watch(error, () => {
  clearStuff();
});

const clearStuff = () => {
  state.email = undefined;
  state.password = undefined;
  success.value ? reloadNuxtApp({ path: "/", ttl: 1000 }) : null;
  const interval = setInterval(() => {
    success.value = false;
    error.value = false;
    clearInterval(interval);
  }, 3000);
};
</script>

<template>
  <div class="border p-10 w-96 rounded-2xl border-b-8">
    <p class="text-2xl pb-10">Login to your account</p>
    <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
      <UFormGroup label="Email" name="email">
        <UInput v-model="state.email" size="xl" autocomplete="off" />
      </UFormGroup>

      <UFormGroup label="Password" name="password">
        <UInput
          v-model="state.password"
          type="password"
          size="xl"
          autocomplete="off"
        />
      </UFormGroup>

      <UButton type="submit" class="w-full" block size="lg"> Login </UButton>
    </UForm>
    <UDivider label="OR" class="pt-4" />
    <UButton
      to="/user/register"
      label="Register"
      class="w-full mt-3"
      block
      size="lg"
      variant="outline"
    />
    <UAlert
      title="User Logged In!"
      class="mt-3 text-green-500 text-center"
      type="warning"
      variant="soft"
      :class="{ hidden: !success }"
    />
    <UAlert
      title="Invalid Credentials"
      class="mt-3 text-red-500 text-center"
      type="warning"
      variant="soft"
      :class="{ hidden: !error }"
    />
  </div>
</template>
