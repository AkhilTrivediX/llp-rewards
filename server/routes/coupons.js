import express from "express";
import db from "../db.js";
import { authenticate } from "../middleware/auth.js";

const router = express.Router();

router.get("/", authenticate, (req, res) => {
  const userId = req.user.id;

  const segmentRows = db
    .prepare("SELECT segmentId FROM user_segments WHERE userId = ?")
    .all(userId);
  const segmentIds = segmentRows.map((r) => r.segmentId);

  if (segmentIds.length === 0) return res.json({ username: req.user.username , coupons: []});

  const placeholders = segmentIds.map(() => "?").join(",");
  const coupons = db
    .prepare(`SELECT * FROM coupon WHERE segmentId IN (${placeholders})`)
    .all(...segmentIds);

  res.json({
    username: req.user.username,
    coupons,
  });
});

export default router;
