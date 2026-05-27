import fs from "node:fs/promises";
import path from "node:path";

const CONTENT_DIR = path.join(process.cwd(), "src", "content");

export const CONTENT_TYPES = ["projects", "services", "testimonials", "site"];

function filePath(type) {
  if (!CONTENT_TYPES.includes(type)) {
    throw new Error(`Unknown content type: ${type}`);
  }
  return path.join(CONTENT_DIR, `${type}.json`);
}

export async function readContent(type) {
  const raw = await fs.readFile(filePath(type), "utf8");
  return JSON.parse(raw);
}

export async function writeContent(type, data) {
  const json = JSON.stringify(data, null, 2) + "\n";
  await fs.writeFile(filePath(type), json, "utf8");
}
