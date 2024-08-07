export const LoginUtil = async (data: any) => {
  const { email, password } = data;

  const res: any = await $fetch("/api/dbActions/login", {
    method: "POST",
    body: {
      u_email: email,
      u_password: password,
    },
  });

  if (res?.message == "User Found") {
    return {
      data: res.data[0],
      status: true
    };
  } else {
    return {
      status: false
    };
  }
};
