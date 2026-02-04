import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { marked } from "marked";
import logger, { sanitizeError } from "../lib/logger.js";
import { SUBTOPICS, SECTION_FILE_MAPPING } from "../data/topics.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const sectionsDir = path.join(__dirname, "..", "data", "sections");

// Generate slug matching the TOC links in the markdown files
function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[():,\[\].'""]/g, "") // Remove punctuation
    .replace(/&/g, "") // Remove & (leaves space gap for double hyphen)
    .replace(/ /g, "-") // Replace each space with hyphen (preserves double spaces -> double hyphens)
    .replace(/[^\w-]/g, "") // Remove any remaining special chars
    .replace(/^-+|-+$/g, ""); // Trim leading/trailing hyphens
}

// Configure marked with custom renderer that adds IDs to headings
marked.use({
  renderer: {
    // Args: text (rendered), depth (level), raw (original text)
    heading(text: string, depth: number, raw: string) {
      const slug = generateSlug(raw);
      return `<h${depth} id="${slug}">${text}</h${depth}>\n`;
    },
  },
});

export interface Section {
  id: string;
  title: string;
  display_name: string;
  content?: string;
}

export function getAllSections(): Section[] {
  return Object.entries(SUBTOPICS).map(([id, display_name]) => ({
    id,
    title: id,
    display_name,
  }));
}

export async function getSectionContent(id: string): Promise<Section | null> {
  const fileName = SECTION_FILE_MAPPING[id];
  if (!fileName) return null;

  const filePath = path.join(sectionsDir, fileName);

  try {
    const markdown = fs.readFileSync(filePath, "utf-8");
    const html = await marked(markdown);

    return {
      id,
      title: id,
      display_name: SUBTOPICS[id] || id,
      content: html,
    };
  } catch (error) {
    // Don't log file paths in production - could expose internal structure
    logger.error(sanitizeError(error), "Error reading section file");
    return null;
  }
}
