const db = require("../services/SetUpMySQL");

const moment = require("moment-timezone");

async function getTodayTasks(user_id) {
  const currentDateInUTC = moment().utc().format("YYYY-MM-DD");
  const query = ` SELECT *
                  FROM tasks 
                  WHERE 
                    DATE(due_date) = '${currentDateInUTC}' AND 
                    user_id = ?;`;

  return new Promise((resolve, reject) => {
    db.query(query, [user_id], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}

async function getUpcomingTasks(user_id) {
  const currentDateInUTC = moment().utc().format("YYYY-MM-DD");
  const query = ` SELECT * 
                  FROM tasks 
                  WHERE 
                    DATE(due_date) >= '${currentDateInUTC}' AND 
                    user_id = ?;`;

  return new Promise((resolve, reject) => {
    db.query(query, [user_id], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}

async function getAllTasks(user_id) {
  const query = `SELECT * FROM tasks WHERE user_id = ?;`;

  return new Promise((resolve, reject) => {
    db.query(query, [user_id], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}

async function getAllTasksAdmin() {
  const query = ` SELECT tasks.*, users.user_name
                  FROM tasks
                  JOIN users 
                  ON tasks.user_id = users.user_id;`;

  return new Promise((resolve, reject) => {
    db.query(query, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}

async function createTask(task, user_id) {
  const query = ` INSERT INTO tasks ( 
                    task_name, 
                    description, 
                    due_date, 
                    priority_id, 
                    label_id,
                    filter_id, 
                    user_id) 
                  VALUES (?, ?, ?, ?, ?, ?, ?);`;

  return new Promise((resolve, reject) => {
    db.query(
      query,
      [
        task.task_name,
        task.description,
        task.due_date,
        task.priority_id,
        task.label_id,
        task.filter_id,
        user_id,
      ],
      (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      }
    );
  });
}

async function editTask(task, user_id) {
  const query = ` UPDATE tasks
                  SET 
                    task_name = ?,
                    description = ?,
                    due_date = ?,
                    priority_id = ?,
                    label_id = ?
                  WHERE 
                    user_id = ? AND
                    task_id = ?;`;

  return new Promise((resolve, reject) => {
    db.query(
      query,
      [
        task.task_name,
        task.description,
        task.due_date,
        task.priority_id,
        task.label_id,
        user_id,
        task.task_id,
      ],
      (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results.affectedRows > 0);
        }
      }
    );
  });
}

async function deleteTask(task_id, user_id) {
  const query = ` DELETE FROM tasks 
                  WHERE 
                    task_id = ? AND 
                    user_id = ?;`;

  return new Promise((resolve, reject) => {
    db.query(query, [task_id, user_id], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results.affectedRows > 0);
      }
    });
  });
}

async function searchTask(input, user_id) {
  const query = ` SELECT * 
                  FROM tasks
                  WHERE 
                    task_name = ? OR task_name LIKE ? AND
                    label_id = ? AND 
                    priority_id = ? AND
                    user_id = ?;`;

  return new Promise((resolve, reject) => {
    db.query(
      query,
      [
        input.task_name,
        `%${input.task_name}%`,
        input.label_id,
        input.priority_id,
        user_id,
      ],
      (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      }
    );
  });
}

async function getTaskDetails(task_id) {
  const query = ` SELECT * 
                  FROM tasks
                  WHERE task_id = ?;`;

  return new Promise((resolve, reject) => {
    db.query(query, [task_id], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results[0]);
      }
    });
  });
}

async function updateStatus(task_id, status, user_id) {
  const query = ` UPDATE tasks
                  SET is_finished = ?
                  WHERE 
                    task_id = ? AND
                    user_id = ?;`;

  return new Promise((resolve, reject) => {
    db.query(query, [status, task_id, user_id], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results.changedRows > 0);
      }
    });
  });
}

async function getTasksByFilterId(filter_id, user_id) {
  const query = ` SELECT * 
                  FROM tasks
                  WHERE 
                    filter_id = ? AND
                    user_id = ?;`;

  return new Promise((resolve, reject) => {
    db.query(query, [filter_id, user_id], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}

async function getTasksByLabelId(label_id, user_id) {
  const query = ` SELECT * 
                  FROM tasks
                  WHERE 
                    label_id = ? AND
                    user_id = ?;`;

  return new Promise((resolve, reject) => {
    db.query(query, [label_id, user_id], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}

module.exports = {
  getTodayTasks,
  getUpcomingTasks,
  getAllTasks,
  getAllTasksAdmin,
  createTask,
  deleteTask,
  editTask,
  searchTask,
  getTaskDetails,
  updateStatus,
  getTasksByFilterId,
  getTasksByLabelId,
};
