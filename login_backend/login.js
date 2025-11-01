const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { sequelize, User } = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

const isEmail = s => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(s));
const isStrong = s => typeof s === "string" && s.length >= 8 && s.length <= 128;

app.get("/api/health", async (_req, res) => {
  try {
    await sequelize.authenticate();
    res.status(200).json({ ok: true, db: true });
  } catch {
    res.status(200).json({ ok: true, db: false });
  }
});

app.post("/api/auth/register", async (req, res) => {
  const { email, password } = req.body || {};
  if (!isEmail(email)) return res.status(400).json({ ok: false, error: "Invalid email" });
  if (!isStrong(password)) return res.status(400).json({ ok: false, error: "Password must be 8-128 chars" });

  try {
    const existing = await User.findOne({ where: { email: String(email).toLowerCase() } });
    if (existing) return res.status(409).json({ ok: false, error: "Email already registered" });

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({
      email: String(email).toLowerCase(),
      password_hash: hash,
      role: "volunteer"
    });

    res.status(200).json({ ok: true, data: { id: user.id, email: user.email, role: user.role } });
  } catch {
    res.status(500).json({ ok: false, error: "Server error" });
  }
});

app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body || {};
  if (!isEmail(email)) return res.status(400).json({ ok: false, error: "Invalid email" });
  if (!isStrong(password)) return res.status(400).json({ ok: false, error: "Password must be 8-128 chars" });

  try {
    const user = await User.findOne({ where: { email: String(email).toLowerCase() } });
    if (!user) return res.status(401).json({ ok: false, error: "Invalid credentials" });

    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) return res.status(401).json({ ok: false, error: "Invalid credentials" });

    const token = jwt.sign({ sub: user.id, email: user.email, role: user.role }, "dev-secret", { expiresIn: "2h" });
    res.status(200).json({ ok: true, data: { token, user: { id: user.id, email: user.email, role: user.role } } });
  } catch {
    res.status(500).json({ ok: false, error: "Server error" });
  }
});

const port = process.env.PORT || 4000;
app.listen(port, async () => {
  try { await sequelize.authenticate(); } catch {}
  console.log(`Server running on http://localhost:${port}`);
});
