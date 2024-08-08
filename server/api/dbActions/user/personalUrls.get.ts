import { db } from "~/utils/db";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const { user_email } = query;

  if (!user_email || user_email === "anonymous") {
    return {
      data: null,
      value: false,
      message: "No data found",
    };
  }
  try {
    const res = await db.query.url.findMany({
      where: (url, { eq }) => eq<any>(url.user_id, user_email),
    });
    if (res.length === 0) {
      return {
        data: null,
        value: false,
        message: "No data found",
      };
    } else {
      return {
        data: res,
        value: true,
        message: true,
      };
    }
  } catch (error) {
    return {
      data: null,
      value: false,
      message: "Database error",
    };
  }
});
