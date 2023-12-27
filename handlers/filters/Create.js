const { createFilter } = require("../../entities/Filters");
const { tokenVerification } = require("../../middlewares/JWT");

const Router = require("express");
const express = require("express");

const r = Router();

r.put("/filter", express.json(), async (req, res) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(400).json("Unauthorized");
  }
  const user_id = await tokenVerification(token, res);
  if (!user_id) {
    return res.status(401).json("Failed to authorize user");
  }

  const filter = req.body;
  if (filter) {
    try {
      if (filter.filter_name === "" || filter.color === "") {
        return res.status(400).json("Invalid input");
      }
      const createFilterResult = createFilter(filter, user_id);
      if (createFilterResult) {
        res.status(200).json("Created filter successfully");
      } else {
        res.status(500).json("Failed to create filter");
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
