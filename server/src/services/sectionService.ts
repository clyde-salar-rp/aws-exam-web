import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { marked } from "marked";
import { SUBTOPICS, SECTION_FILE_MAPPING } from "../data/topics.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const sectionsDir = "/Users/clydesalar/aws_exam_cli/sections";

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
    console.error(`Error reading section file: ${filePath}`, error);
    return null;
  }
}
