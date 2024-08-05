import { and, eq } from "drizzle-orm";
import { user } from "~/drizzle/schema";
import { db } from "~/utils/db";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    console.log(body);
    if (validateBody(body)) {
      const u_name = body.u_name;
      const u_phone = body.u_phone;
      const u_email = body.u_email;
      const u_password = body.u_password;

      console.log(u_email, u_password);

      // Add password encryption later

      const res = await db.insert(user).values({
        id: crypto.randomUUID().toString(),
        user_name: u_name,
        user_phone: u_phone,
        user_email: u_email,
        user_password: u_password
      }).returning()

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
        message: "User Registered",
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
  if (body.u_email === undefined || body.u_password === undefined || body.u_name === undefined || body.u_phone === undefined) {
    return false;
  }
  return true;
}