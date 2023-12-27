const { createLabel } = require("../../entities/Labels");
const { tokenVerification } = require("../../middlewares/JWT");

const Router = require("express");
const express = require("express");

const r = Router();

r.put("/label", express.json(), async (req, res) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(400).json("Unauthorized dd");
  }
  const user_id = await tokenVerification(token, res);
  if (!user_id) {
    return res.status(401).json("Failed to authorize user");
  }

  const label = req.body;
  if (label) {
    try {
      if (label.label_name === "" || label.color === "") {
        return res.status(400).json("Invalid input");
      }
      const createLabelResult = createLabel(label, user_id);
      if (createLabelResult) {
        res.status(200).json("Created label successfully");
      } else {
        res.status(500).json("Failed to create label");
      }
    } catch (err) {
      console.error("Error:", err);
      res.status(500).json("Internal Server Error");
    }
  } else {
    return res.status(400).json("Bad request");
  }
});

module.exports = r;
