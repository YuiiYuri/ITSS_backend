const { tokenVerification } = require("../../middlewares/JWT");
const { editTask, updateStatus } = require("../../entities/Tasks");

const Router = require("express");
const express = require("express");

const r = Router();

r.post("/task", express.json(), async (req, res) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(400).json("Unauthorized");
  }
  const user_id = await tokenVerification(token, res);
  if (!user_id) {
    return res.status(401).json("Failed to authorize user");
  }

  const task = req.body;
  if (task) {
    try {
      if (
        task.task_id === null ||
        task.task_name === "" ||
        task.description === "" ||
        task.due_date === "" ||
        task.priority_id === null ||
        task.label_id === null
      ) {
        return res.status(400).json("Invalid input");
      }
      const editTaskResult = await editTask(task, user_id);
      if (editTaskResult) {
        res.status(200).json("Updated task successfully");
      } else {
        return res.status(500).json("Failed to update task");
      }
    } catch (err) {
      console.error("Error:", err);
      res.status(500).json("Internal Server Error");
    }
  } else {
    return res.status(400).json("Bad request");
  }
});

r.post("/task/status", express.json(), async (req, res) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(400).json("Unauthorized");
  }
  const user_id = await tokenVerification(token, res);
  if (!user_id) {
    return res.status(401).json("Failed to authorize user");
  }

  const { task_id, status } = req.body;
  if (task_id || status) {
    try {
      if (task_id === null || status === null) {
        return res.status(400).json("Invalid input");
      }
      const updateStatusResult = await updateStatus(task_id, status, user_id);
      if (updateStatusResult) {
        res.status(200).json("Updated status successfully");
      } else {
        return res.status(500).json("Failed to update status");
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
