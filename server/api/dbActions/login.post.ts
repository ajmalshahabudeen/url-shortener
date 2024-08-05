import { and, eq } from "drizzle-orm";
import { user } from "~/drizzle/schema";
import { db } from "~/utils/db";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    console.log(body);
    if (validateBody(body)) {
      const u_email = body.u_email;
      const u_password = body.u_password;

      console.log(u_email, u_password);
      const res = await db
        .select()
        .from(user)
        .where(
          and(eq(user.user_email, u_email), eq(user.user_password, u_password))
        );

      if (res.length == 0) {
        setResponseStatus(event, 404);
        return {
          data: "error",
          message: "User Not Found",
        };
      }
      setResponseStatus(event, 200);
      return {
        data: res,
        message: "User Found",
      };
    } else {
      return {
        data: "error",
        message: "No Body Found",
      };
    }
  } catch (err) {
    console.log("Something went wrong at Database");
    setResponseStatus(event, 500);
    return {
      data: "error",
    };
  }
});

const validateBody = (body: any) => {
  if (body === undefined) {
    return false;
  }
  if (body.u_email === undefined || body.u_password === undefined) {
    return false;
  }
  return true;
}