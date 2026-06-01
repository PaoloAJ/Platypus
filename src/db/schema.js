import {
  pgTable,
  text,
  jsonb,
  integer,
  boolean,
  timestamp,
} from "drizzle-orm/pg-core";

const orderedFields = {
  id: text("id").primaryKey(),
  position: integer("position").notNull().default(0),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
};

export const projects = pgTable("projects", {
  ...orderedFields,
  location: text("location"),
  scope: text("scope"),
  duration: text("duration"),
  quote: text("quote"),
  before: jsonb("before"),
  after: jsonb("after"),
});

export const gallery = pgTable("gallery", {
  ...orderedFields,
  title: text("title"),
  category: text("category"),
  location: text("location"),
  size: text("size"),
  description: text("description"),
  image: jsonb("image"),
});

export const serviceCards = pgTable("service_cards", {
  ...orderedFields,
  title: text("title"),
  blurb: text("blurb"),
  fromPrice: text("from_price"),
  bullets: jsonb("bullets").$type().default([]),
  icon: text("icon"),
  popular: boolean("popular").default(false),
});

export const serviceCategories = pgTable("service_categories", {
  ...orderedFields,
  title: text("title"),
  items: jsonb("items").$type().default([]),
});

export const testimonials = pgTable("testimonials", {
  ...orderedFields,
  name: text("name"),
  loc: text("loc"),
  stars: integer("stars").default(5),
  quote: text("quote"),
  initials: text("initials"),
  tone: text("tone"),
  title: text("title"),
  service: text("service"),
  date: text("date"),
});

export const team = pgTable("team", {
  ...orderedFields,
  name: text("name"),
  role: text("role"),
  experience: text("experience"),
  specialty: text("specialty"),
  image: jsonb("image"),
});

export const site = pgTable("site", {
  id: text("id").primaryKey(),
  data: jsonb("data").notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});
