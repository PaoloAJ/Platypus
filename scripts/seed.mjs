// Seeds site copy + services from src/content/*.json into the database.
// Other tables (projects, gallery, testimonials, team) are left empty for
// the admin to populate.
//
// Run: node scripts/seed.mjs

import "dotenv/config";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { site, serviceCards, serviceCategories } from "../src/db/schema.js";

if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL not set. Make sure .env.local is filled in.");
  process.exit(1);
}

const __dirname = dirname(fileURLToPath(import.meta.url));
const readJson = (rel) =>
  JSON.parse(readFileSync(resolve(__dirname, rel), "utf8"));

const siteJson = readJson("../src/content/site.json");
const servicesJson = readJson("../src/content/services.json");

const sql = postgres(process.env.DATABASE_URL, { prepare: false });
const db = drizzle(sql);

try {
  // --- Site copy (singleton) ---
  await db
    .insert(site)
    .values({ id: "singleton", data: siteJson })
    .onConflictDoUpdate({
      target: site.id,
      set: { data: siteJson, updatedAt: new Date() },
    });
  console.log("✅ Seeded site copy.");

  // --- Services (cards + categories) ---
  const cards = (servicesJson.homepage ?? []).map((c, i) => ({
    id: c.id,
    position: i,
    title: c.title ?? "",
    blurb: c.blurb ?? "",
    fromPrice: c.from ?? "",
    bullets: c.bullets ?? [],
    icon: c.icon ?? "anchor",
    popular: !!c.popular,
  }));

  const categories = (servicesJson.categories ?? []).map((c, i) => ({
    id: c.id,
    position: i,
    title: c.title ?? "",
    items: c.items ?? [],
  }));

  await db.transaction(async (tx) => {
    await tx.delete(serviceCards);
    await tx.delete(serviceCategories);
    if (cards.length) await tx.insert(serviceCards).values(cards);
    if (categories.length) await tx.insert(serviceCategories).values(categories);
  });
  console.log(
    `✅ Seeded services: ${cards.length} homepage card${cards.length === 1 ? "" : "s"}, ${categories.length} section${categories.length === 1 ? "" : "s"}.`,
  );

  console.log("Other tables (projects, gallery, testimonials, team) left empty.");
} catch (err) {
  console.error("❌ Seed failed");
  console.error("Code:    ", err.code);
  console.error("Detail:  ", err.detail);
  console.error("Hint:    ", err.hint);
  console.error("Message: ", err.message);
  if (err.cause) console.error("Cause:   ", err.cause);
  process.exit(1);
} finally {
  await sql.end();
}
