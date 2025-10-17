const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
app.use(cors());
app.use(express.json());

const users = [
  { id: 1, email: "arman@gmail.com", hash: bcrypt.hashSync("arman123", 10), role: "volunteer" },
  { id: 2, email: "razin@gmail.com", hash: bcrypt.hashSync("razin123", 10), role: "volunteer" },
  { id: 3, email: "alex@gmail.com", hash: bcrypt.hashSync("alex123", 10), role: "volunteer" },
  { id: 4, email: "andrew@gmail.com", hash: bcrypt.hashSync("andrew123", 10), role: "volunteer" }
];

const isEmail = s => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(s));
const isStrong = s => typeof s === "string" && s.length >= 8 && s.length <= 128;

app.get("/api/health", (_req, res) => res.status(200).json({ ok: true }));

app.post("/api/auth/register", async (req, res) => {
  const { email, password } = req.body || {};
  if (!isEmail(email)) return res.status(400).json({ ok: false, error: "Invalid email" });
  if (!isStrong(password)) return res.status(400).json({ ok: false, error: "Password must be 8-128 chars" });
  const exists = users.find(u => u.email.toLowerCase() === String(email).toLowerCase());
  if (exists) return res.status(409).json({ ok: false, error: "Email already registered" });
  const hash = await bcrypt.hash(password, 10);
  const user = { id: users.length + 1, email, hash, role: "volunteer" };
  users.push(user);
  res.status(200).json({ ok: true, data: { id: user.id, email: user.email } });
});

app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body || {};
  if (!isEmail(email)) return res.status(400).json({ ok: false, error: "Invalid email" });
  if (!isStrong(password)) return res.status(400).json({ ok: false, error: "Password must be 8-128 chars" });
  const user = users.find(u => u.email.toLowerCase() === String(email).toLowerCase());
  if (!user) return res.status(401).json({ ok: false, error: "Invalid credentials" });
  const ok = await bcrypt.compare(password, user.hash);
  if (!ok) return res.status(401).json({ ok: false, error: "Invalid credentials" });
  const token = jwt.sign({ sub: user.id, email: user.email, role: user.role }, "dev-secret", { expiresIn: "2h" });
  res.status(200).json({ ok: true, data: { token, user: { id: user.id, email: user.email, role: user.role } } });
});

app.listen(4000, () => console.log("Server running on http://localhost:4000"));
