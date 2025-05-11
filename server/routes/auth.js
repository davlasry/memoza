import express from "express";
import axios from "axios";

const router = express.Router();

router.get("/github", (req, res) => {
  const clientId = process.env.GITHUB_CLIENT_ID;
  const redirectUri = process.env.GITHUB_CALLBACK_URL;
  res.redirect(
    `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=repo,user`
  );
});

router.get("/github/callback", async (req, res) => {
  const code = req.query.code;

  try {
    const response = await axios.post(
      `https://github.com/login/oauth/access_token`,
      {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      },
      {
        headers: { Accept: "application/json" },
      }
    );

    const accessToken = response.data.access_token;
    req.session.token = accessToken;

    res.redirect("http://localhost:5173/dashboard");  // Redirect to frontend
  } catch (error) {
    res.status(500).send("OAuth Error");
  }
});

export default router;
