export const CreateShortUrl = async (url: string) => {
  // console.log(url)
  const user_email = sessionStorage.getItem("user_email") || "anonymous";
  const res = await $fetch("/api/dbActions/url/create", {
    method: "POST",
    body: {
      url_length: 6,
      url_value: url,
      user_id: user_email,
    },
  });
  const result: any = res?.data;
  const Key = result[0]?.url_key;
  //   return result;
  // console.log(result)
  return Key;
};

export const GetShortUrl = async (key: string) => {
  const res: any = await $fetch("/api/dbActions/url/find?key=" + key, {
    method: "GET",
  });
  // console.log(res);
  if (res?.message == "Found URL") {
    return res?.value?.url_value;
  } else {
    return null;
  }
};

export const GetUserUrls = async () => {
  const user_email = sessionStorage.getItem("user_email") || "anonymous";
  if (user_email !== "anonymous") {
    const res: any = await $fetch(
      "/api/dbActions/user/personalUrls?user_email=" + user_email,
      {
        method: "GET",
      }
    );
    return {
      message: "success",
      value: true,
      data: res.data,
    };
  } else {
    return {
      message: "error",
      value: false,
      data: null,
    };
  }
};
