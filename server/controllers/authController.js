import db from "../db.js";
import jwt from "jsonwebtoken";

export function login(req, res) {
  const { username, password } = req.body;
  const { brand } = req.params;

  if (!username || typeof username !== "string" || username.trim().length === 0) {
  return res.status(400).json({ message: "Invalid username" });
}

if (!password || typeof password !== "string" || password.length < 3) {
  return res.status(400).json({ message: "Invalid password" });
}

  const stmt = db.prepare("SELECT * FROM user WHERE username = ?");
  const user = stmt.get(username);

  if (!user) return res.status(401).json({ message: "User not found" });
  if (user.password !== password) return res.status(401).json({ message: "Invalid password" });

  const token = jwt.sign({ id: user.id, username: user.username  }, process.env.JWT_SECRET, { expiresIn: "1h" });

  res.json({ token });
}

//Suggestion: might add rate limit later to prevent bruteforce attacks