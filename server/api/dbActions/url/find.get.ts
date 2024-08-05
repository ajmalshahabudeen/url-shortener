import { db } from "~/utils/db";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const key = query.key;

  if (key) {
    console.log(key);

    try {
      const res = await db.query.url.findMany({
        where: (url, { eq }) => eq<any>(url.url_key, key),
      });

      if (res.length == 0) {
        setResponseStatus(event, 404);
        return {
          message: "Failed to find URL",
          value: null,
        };
      } else {
        setResponseStatus(event, 200);
        return {
          message: "Found URL",
          value: res,
        };
      }
    } catch (err) {
      setResponseStatus(event, 404);
      return {
        message: "Failed to find URL",
        value: null,
      };
    }
  }
  setResponseStatus(event, 404);
  return {
    message: "Failed to find URL",
    value: null,
  };
});
