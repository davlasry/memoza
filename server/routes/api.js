import express from "express";
import axios from "axios";

const router = express.Router();

router.get("/github/user", async (req, res) => {
  const token = req.session.token;
  if (!token) {
    return res.status(401).json({ error: "Not authenticated with GitHub" });
  }

  try {
    const userRes = await axios.get("https://api.github.com/user", {
      headers: { Authorization: `token ${token}` },
    });
    res.json(userRes.data);
  } catch (err) {
    console.error("Failed to fetch user:", err.message);
    res.status(500).json({ error: "Failed to fetch user" });
  }
});

router.get("/github/pull-requests", async (req, res) => {
  const token = req.session.token;
  if (!token) {
    return res.status(401).json({ error: "Not authenticated with GitHub" });
  }

  try {
    const pullRequestsRes = await axios.get("https://api.github.com/search/issues", {
      headers: { 
        Authorization: `token ${token}`,
        Accept: "application/vnd.github.v3+json"
      },
      params: {
        q: "is:pr author:@me",
        sort: "updated",
        order: "desc"
      }
    });
    res.json(pullRequestsRes.data);
  } catch (err) {
    console.error("Failed to fetch pull requests:", err.message);
    res.status(500).json({ error: "Failed to fetch pull requests" });
  }
});

export default router;
