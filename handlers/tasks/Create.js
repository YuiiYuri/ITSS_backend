const { createTask } = require("../../entities/Tasks");
const { tokenVerification } = require("../../middlewares/JWT");

const Router = require("express");
const express = require("express");

const r = Router();

r.put("/task", express.json(), async (req, res) => {
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
        task.task_name === "" ||
        task.description === "" ||
        task.due_date === "" ||
        task.priority_id === null
      ) {
        return res.status(400).json("Invalid input");
      }
      const createTaskResult = createTask(task, user_id);
      if (createTaskResult) {
        res.status(200).json("Created task successfully");
      } else {
        return res.status(500).json("Failed to create task");
      }
    } catch (err) {
      console.error("Error:", err);
      return res.status(500).json("Internal Server Error");
    }
  } else {
    return res.status(400).json("Bad request");
  }
});

r.put("/adminTask", express.json(), async (req, res) => {
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
        task.task_name === "" ||
        task.description === "" ||
        task.due_date === "" ||
        task.priority_id === null ||
        task.user_id === null
      ) {
        return res.status(400).json("Invalid input");
      }
      const createTaskResult = createTask(task, task.user_id);
      if (createTaskResult) {
        res.status(200).json("Created task successfully");
      } else {
        return res.status(500).json("Failed to create task");
      }
    } catch (err) {
      console.error("Error:", err);
      return res.status(500).json("Internal Server Error");
    }
  } else {
    return res.status(400).json("Bad request");
  }
});

module.exports = r;
