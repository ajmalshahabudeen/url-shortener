import { url } from "~/drizzle/schema"
import { db } from "~/utils/db"


export default defineEventHandler(async (event) => {

  // console.log(event)

  await db.insert(url).values({
    id: crypto.randomUUID().toString(),
    user_id: '123',
    url_key: '123',
    url_value: '123',
    date: '123'
  })

  const res = await db.select().from(url)

  setResponseStatus(event, 200)
  return {
    data: res
  }
})
