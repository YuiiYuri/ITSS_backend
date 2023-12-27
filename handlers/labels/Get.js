const {
  getLabels,
  getAllLabelsAdmin,
  getLabel,
} = require("../../entities/Labels");
const { tokenVerification } = require("../../middlewares/JWT");
const { verifyAdmin } = require("../../entities/Users");

const Router = require("express");
const r = Router();

r.get("/labels", async (req, res) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(400).json("Token not found");
  }
  const user_id = await tokenVerification(token, res);
  if (!user_id) {
    return res.status(401).json("Failed to authorize user");
  }

  try {
    const labels = await getLabels();
    if (labels) {
      res.status(200).json(labels);
    } else {
      res.status(500).send("Internal Server Error");
    }
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Internal Server Error");
  }
});

r.get("/label/:id", async (req, res) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(400).json("Token not found");
  }
  const user_id = await tokenVerification(token, res);
  if (!user_id) {
    return res.status(401).json("Failed to authorize user");
  }

  try {
    const labels = await getLabel(req.params.id);
    if (labels) {
      res.status(200).json(labels);
    } else {
      res.status(500).send("Internal Server Error");
    }
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Internal Server Error");
  }
});

r.get("/admin/labels", async (req, res) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(400).json("Token not found");
  }
  const user_id = await tokenVerification(token, res);
  if (!user_id) {
    return res.status(401).json("Failed to authorize user");
  }

  const adminVerifyResult = await verifyAdmin(user_id);
  if (adminVerifyResult !== "admin") {
    return res.status(403).json("No permission");
  }

  try {
    const labels = await getAllLabelsAdmin();
    if (labels) {
      res.status(200).json(labels);
    } else {
      res.status(500).send("Internal Server Error");
    }
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = r;
