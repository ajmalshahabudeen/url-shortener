import { pgTable, varchar, text, integer } from "drizzle-orm/pg-core"
  import { sql } from "drizzle-orm"



export const user = pgTable("user", {
	id: varchar("id", { length: 255 }).primaryKey().notNull(),
	user_name: varchar("user_name", { length: 40 }),
	user_email: varchar("user_email", { length: 100 }),
	user_phone: varchar("user_phone", { length: 20 }),
	user_password: varchar("user_password", { length: 255 }),
});

export const url = pgTable("url", {
	id: varchar("id", { length: 255 }).primaryKey().notNull(),
	user_id: varchar("user_id", { length: 255 }).notNull(),
	url_key: varchar("url_key", { length: 10 }).notNull(),
	url_value: text("url_value").notNull(),
	date: varchar("date", { length: 30 }),
	vistors_count: integer("vistors_count").default(0),
});