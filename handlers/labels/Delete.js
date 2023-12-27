const { tokenVerification } = require("../../middlewares/JWT");
const { deleteLabel } = require("../../entities/Labels");

const Router = require("express");
const express = require("express");

const r = Router();

r.delete("/label/:label_id", express.json(), async (req, res) => {
  const token = req.headers.authorization;
  console.log("ok");
  if (!token) {
    return res.status(400).json("Unauthorized");
  }
  const user_id = await tokenVerification(token, res);
  if (!user_id) {
    return res.status(401).json("Failed to authorize user");
  }

  const label_id = Number(req.params.label_id);
  if (label_id) {
    try {
      const deleteLabelResult = await deleteLabel(label_id, user_id);
      if (deleteLabelResult) {
        res.status(200).json("Deleted label successfully");
      } else {
        return res.status(500).json("Failed to delete label");
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
