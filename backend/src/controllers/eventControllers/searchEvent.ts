import Event from "../../models/Event";
import { Router, Request, Response } from 'express';
export const searchEvents =  async (req:Request, res:Response) => {
  try {
    const search = (req.query.search as string)?.trim();

    if (!search) return res.json([]);

    // Step 1: Try fast text index search
    let results = await Event.find(
      { $text: { $search: search } },
      { score: { $meta: "textScore" } }
    ).sort({ score: { $meta: "textScore" } });

    // Step 2: Fallback to regex if no text matches
    if (results.length === 0) {
      const regex = new RegExp(search, "i");
      results = await Event.find({
        $or: [
          { title: { $regex: regex } },
          { description: { $regex: regex } },
          { address: { $regex: regex } },
          { category: { $regex: regex } },
        ],
      });
    }

    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}