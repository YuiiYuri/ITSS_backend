const { tokenVerification } = require("../../middlewares/JWT");
const { deleteFilter } = require("../../entities/Filters");

const Router = require("express");
const express = require("express");

const r = Router();

r.delete("/filter", express.json(), async (req, res) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(400).json("Unauthorized");
  }
  const user_id = await tokenVerification(token, res);
  if (!user_id) {
    return res.status(401).json("Failed to authorize user");
  }

  const { filter_id } = req.body;
  if (filter_id) {
    try {
      const deleteFilterResult = await deleteFilter(filter_id, user_id);
      if (deleteFilterResult) {
        res.status(200).json("Deleted filter successfully");
      } else {
        return res.status(500).json("Failed to delete filter");
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
