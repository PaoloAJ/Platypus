-- Platypus CMS — initial schema
-- Apply with: npx drizzle-kit push  (or paste into Supabase SQL editor)

CREATE TABLE IF NOT EXISTS "projects" (
  "id" text PRIMARY KEY,
  "position" integer DEFAULT 0 NOT NULL,
  "updated_at" timestamp with time zone DEFAULT now() NOT NULL,
  "location" text,
  "scope" text,
  "duration" text,
  "quote" text,
  "before" jsonb,
  "after" jsonb
);

CREATE TABLE IF NOT EXISTS "gallery" (
  "id" text PRIMARY KEY,
  "position" integer DEFAULT 0 NOT NULL,
  "updated_at" timestamp with time zone DEFAULT now() NOT NULL,
  "title" text,
  "category" text,
  "location" text,
  "size" text,
  "description" text,
  "image" jsonb
);

CREATE TABLE IF NOT EXISTS "service_cards" (
  "id" text PRIMARY KEY,
  "position" integer DEFAULT 0 NOT NULL,
  "updated_at" timestamp with time zone DEFAULT now() NOT NULL,
  "title" text,
  "blurb" text,
  "from_price" text,
  "bullets" jsonb DEFAULT '[]'::jsonb,
  "icon" text,
  "popular" boolean DEFAULT false
);

CREATE TABLE IF NOT EXISTS "service_categories" (
  "id" text PRIMARY KEY,
  "position" integer DEFAULT 0 NOT NULL,
  "updated_at" timestamp with time zone DEFAULT now() NOT NULL,
  "title" text,
  "items" jsonb DEFAULT '[]'::jsonb
);

CREATE TABLE IF NOT EXISTS "testimonials" (
  "id" text PRIMARY KEY,
  "position" integer DEFAULT 0 NOT NULL,
  "updated_at" timestamp with time zone DEFAULT now() NOT NULL,
  "name" text,
  "loc" text,
  "stars" integer DEFAULT 5,
  "quote" text,
  "initials" text,
  "tone" text,
  "title" text,
  "service" text,
  "date" text
);

CREATE TABLE IF NOT EXISTS "team" (
  "id" text PRIMARY KEY,
  "position" integer DEFAULT 0 NOT NULL,
  "updated_at" timestamp with time zone DEFAULT now() NOT NULL,
  "name" text,
  "role" text,
  "experience" text,
  "specialty" text,
  "image" jsonb
);

CREATE TABLE IF NOT EXISTS "site" (
  "id" text PRIMARY KEY,
  "data" jsonb NOT NULL,
  "updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
