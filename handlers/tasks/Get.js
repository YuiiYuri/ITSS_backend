const {
  getTodayTasks,
  getUpcomingTasks,
  getAllTasks,
  getAllTasksAdmin,
  searchTask,
  getTaskDetails,
  getTasksByFilterId,
  getTasksByLabelId,
} = require("../../entities/Tasks");
const { getUsers } = require("../../entities/Users");
const { verifyAdmin, getUserDetails } = require("../../entities/Users");
const { tokenVerification } = require("../../middlewares/JWT");

const Router = require("express");
const express = require("express");
const r = Router();

r.get("/users", async (req, res) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(400).json("Token not found");
  }
  const user_id = await tokenVerification(token, res);
  if (!user_id) {
    return res.status(401).json("Failed to authorize user");
  }

  try {
    const users = await getUsers();
    if (users) {
      res.status(200).json(users);
    } else {
      res.status(500).send("Internal Server Error");
    }
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Internal Server Error");
  }
});

r.get("/today-tasks", async (req, res) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(400).json("Token not found");
  }
  const user_id = await tokenVerification(token, res);
  if (!user_id) {
    return res.status(401).json("Failed to authorize user");
  }

  try {
    const tasks = await getTodayTasks(user_id);
    if (tasks) {
      res.status(200).json(tasks);
    } else {
      res.status(500).send("Internal Server Error");
    }
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Internal Server Error");
  }
});

r.get("/upcoming-tasks", async (req, res) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(400).json("Token not found");
  }
  const user_id = await tokenVerification(token, res);
  if (!user_id) {
    return res.status(401).json("Failed to authorize user");
  }

  try {
    const tasks = await getUpcomingTasks(user_id);
    if (tasks) {
      res.status(200).json(tasks);
    } else {
      res.status(500).send("Internal Server Error");
    }
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Internal Server Error");
  }
});

r.get("/all-tasks", async (req, res) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(400).json("Token not found");
  }
  const user_id = await tokenVerification(token, res);
  if (!user_id) {
    return res.status(401).json("Failed to authorize user");
  }

  try {
    const tasks = await getAllTasks(user_id);
    if (tasks) {
      res.status(200).json(tasks);
    } else {
      res.status(500).send("Internal Server Error");
    }
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Internal Server Error");
  }
});

r.get("/admin/all-tasks", async (req, res) => {
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
    const tasks = await getAllTasksAdmin();
    if (tasks) {
      res.status(200).json(tasks);
    } else {
      res.status(500).send("Internal Server Error");
    }
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Internal Server Error");
  }
});

r.post("/search-tasks", express.json(), async (req, res) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(400).json("Token not found");
  }
  const user_id = await tokenVerification(token, res);
  if (!user_id) {
    return res.status(401).json("Failed to authorize user");
  }

  const input = req.body;
  if (input) {
    try {
      if (
        input.task_name === "" ||
        input.label_id === null ||
        input.priority_id === null
      ) {
        return res.status(400).json("Invalid input");
      }
      const searchResult = await searchTask(input, user_id);
      if (searchResult) {
        res.status(200).json(searchResult);
      } else {
        res.status(500).json("Failed to search");
      }
    } catch (err) {
      console.error("Error:", err);
      res.status(500).send("Internal Server Error");
    }
  } else {
    return res.status(400).json("Bad request");
  }
});

r.get("/admin/task/:id", async (req, res) => {
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

  const task_id = req.params.id;
  if (task_id) {
    try {
      const task = await getTaskDetails(task_id);
      if (!task) {
        return res.status(404).json("Task not found");
      }
      const user = await getUserDetails(task.user_id);
      if (!user) {
        return res.status(404).json("User not found");
      }

      if (task && user) {
        return res.status(200).json({
          user: user,
          task: task,
        });
      }
    } catch (err) {
      console.error("Error:", err);
      res.status(500).send("Internal Server Error");
    }
  } else {
    return res.status(400).json("Bad request");
  }
});

r.get("/tasks", async (req, res) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(400).json("Token not found");
  }
  const user_id = await tokenVerification(token, res);
  if (!user_id) {
    return res.status(401).json("Failed to authorize user");
  }

  const filter_id = req.query.filter_id;
  const label_id = req.query.label_id;

  if (filter_id && label_id) {
    return res
      .status(400)
      .json("Bad request. Provide either filter_id or label_id, not both.");
  }

  try {
    let tasks;

    if (filter_id) {
      tasks = await getTasksByFilterId(filter_id, user_id);
    } else if (label_id) {
      tasks = await getTasksByLabelId(label_id, user_id);
    } else {
      return res.status(400).json("Bad request");
    }

    if (tasks && tasks.length > 0) {
      return res.status(200).json(tasks);
    } else {
      return res.status(204).json("No tasks found");
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json("Internal Server Error");
  }
});

module.exports = r;
