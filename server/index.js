import express from "express";
import session from "express-session";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import apiRoutes from "./routes/api.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({
  origin: "http://localhost:5173",  // Vite dev server
  credentials: true
}));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
}));

app.use("/auth", authRoutes);
app.use("/api", apiRoutes);

app.get("/", (req, res) => {
  res.send("Memoza API running...");
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
