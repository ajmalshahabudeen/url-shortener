import { url } from "~/drizzle/schema";
import { db } from "~/utils/db";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  console.log(body);
  const { url_length, url_value, user_id } = body;

  if (validateBody(body)) {
    const k = shorten(url_length);
    const valid = await validateKey(k);

    if (!valid) {
      return saveData(k, url_value, user_id, event);
    } else {
      while (true) {
        console.log("key already exists");
        const k = shorten(url_length);
        const valid = await validateKey(k);
        if (!valid) {
          break;
        }
      }
      return saveData(k, url_value, user_id, event);
    }
  }
});

const shorten = (url_length: number) => {
  const length = url_length;
  const start = 0;
  const end = start + length;
  const key = crypto.randomUUID().toString().substring(start, end);

  return key;
};

const validateKey = async (key: any) => {
  const res = await db.query.url.findFirst({
    where: (url, { eq }) => eq(url.url_key, key),
  });

  console.log(res);
  if (res === undefined) {
    return false;
  }
  return true;
};

const validateBody = (body: any) => {
  if (body === undefined) {
    return false;
  }
  if (
    body.url_length === undefined ||
    body.url_value === undefined ||
    body.user_id === undefined
  ) {
    return false;
  }
  return true;
};

const saveData = async (k: any, url_value: any, user_id: any, event: any) => { 
  try {
    const res = await db
      .insert(url)
      .values({
        id: crypto.randomUUID().toString(),
        user_id: user_id,
        url_key: k,
        url_value: url_value,
        date: new Date().toISOString(),
      })
      .returning();

    if (res.length == 0) {
      setResponseStatus(event, 404);
      return {
        data: "error",
        message: "URL Not Created",
      };
    }
    setResponseStatus(event, 200);
    return {
      data: res,
      message: "URL Created",
    };
  } catch (e) {
    setResponseStatus(event, 500);
    return {
      data: "error",
      message: "Something went wrong with the database",
    };
  }
 }