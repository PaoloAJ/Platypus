import { asc, eq } from "drizzle-orm";
import { db } from "@/db";
import {
  projects,
  gallery,
  serviceCards,
  serviceCategories,
  testimonials,
  team,
  site,
} from "@/db/schema";

export const CONTENT_TYPES = [
  "projects",
  "services",
  "testimonials",
  "site",
  "gallery",
  "team",
];

const SITE_ID = "singleton";

const TABLE = {
  projects,
  gallery,
  testimonials,
  team,
};

// --- READERS -----------------------------------------------------------

async function readArray(table) {
  return db.select().from(table).orderBy(asc(table.position), asc(table.id));
}

async function readSite() {
  const rows = await db.select().from(site).where(eq(site.id, SITE_ID)).limit(1);
  return rows[0]?.data ?? {};
}

async function readServices() {
  const [cards, categories] = await Promise.all([
    db.select().from(serviceCards).orderBy(asc(serviceCards.position), asc(serviceCards.id)),
    db
      .select()
      .from(serviceCategories)
      .orderBy(asc(serviceCategories.position), asc(serviceCategories.id)),
  ]);

  return {
    homepage: cards.map((c) => ({
      id: c.id,
      title: c.title ?? "",
      blurb: c.blurb ?? "",
      from: c.fromPrice ?? "",
      bullets: c.bullets ?? [],
      icon: c.icon ?? "anchor",
      popular: !!c.popular,
    })),
    categories: categories.map((c) => ({
      id: c.id,
      title: c.title ?? "",
      items: c.items ?? [],
    })),
  };
}

export async function readContent(type) {
  if (!CONTENT_TYPES.includes(type)) {
    throw new Error(`Unknown content type: ${type}`);
  }
  if (type === "site") return readSite();
  if (type === "services") return readServices();
  return readArray(TABLE[type]);
}

// --- WRITERS -----------------------------------------------------------

async function writeArray(table, items) {
  return db.transaction(async (tx) => {
    await tx.delete(table);
    if (!items?.length) return;
    const rows = items.map(({ updatedAt, position, ...item }, i) => ({
      ...item,
      position: i,
    }));
    await tx.insert(table).values(rows);
  });
}

async function writeSite(data) {
  await db
    .insert(site)
    .values({ id: SITE_ID, data })
    .onConflictDoUpdate({
      target: site.id,
      set: { data, updatedAt: new Date() },
    });
}

async function writeServices(data) {
  const homepage = (data?.homepage ?? []).map((c, i) => ({
    id: c.id,
    position: i,
    title: c.title ?? "",
    blurb: c.blurb ?? "",
    fromPrice: c.from ?? "",
    bullets: c.bullets ?? [],
    icon: c.icon ?? "anchor",
    popular: !!c.popular,
  }));
  const categories = (data?.categories ?? []).map((c, i) => ({
    id: c.id,
    position: i,
    title: c.title ?? "",
    items: c.items ?? [],
  }));

  await db.transaction(async (tx) => {
    await tx.delete(serviceCards);
    await tx.delete(serviceCategories);
    if (homepage.length) await tx.insert(serviceCards).values(homepage);
    if (categories.length) await tx.insert(serviceCategories).values(categories);
  });
}

export async function writeContent(type, data) {
  if (!CONTENT_TYPES.includes(type)) {
    throw new Error(`Unknown content type: ${type}`);
  }
  if (type === "site") return writeSite(data);
  if (type === "services") return writeServices(data);
  return writeArray(TABLE[type], data);
}
