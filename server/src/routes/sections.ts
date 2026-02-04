import { Router } from "express";
import { getAllSections, getSectionContent } from "../services/sectionService.js";

const router = Router();

// GET /api/sections - Get all sections
router.get("/", (req, res) => {
  try {
    const sections = getAllSections();
    res.json(sections);
  } catch (error) {
    console.error("Error getting sections:", error);
    res.status(500).json({ error: "Failed to get sections" });
  }
});

// GET /api/sections/:id - Get section content
router.get("/:id", async (req, res) => {
  try {
    const section = await getSectionContent(req.params.id);
    if (!section) {
      return res.status(404).json({ error: "Section not found" });
    }
    res.json(section);
  } catch (error) {
    console.error("Error getting section:", error);
    res.status(500).json({ error: "Failed to get section" });
  }
});

export default router;
