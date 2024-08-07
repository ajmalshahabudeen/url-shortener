export const RegisterUtil = async (data: any) => {
  const { name, email, phone, password } = data;

  const res: any = await $fetch("/api/dbActions/register", {
    method: "POST",
    body: {
      u_name: name,
      u_phone: phone,
      u_email: email,
      u_password: password,
    },
  });

  if (res?.message == "User Registered") {
    return true;
  } else {
    return false;
  }
};
