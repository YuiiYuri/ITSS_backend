const db = require("../services/SetUpMySQL");

async function createLabel(label) {
  const query = `   INSERT INTO label ( 
                      label_name, 
                      color) 
                    VALUES (?, ?);`;

  return new Promise((resolve, reject) => {
    db.query(query, [label.label_name, label.color], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}

async function getLabels() {
  const query = ` SELECT *    
                  FROM label;`;

  return new Promise((resolve, reject) => {
    db.query(query, [], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}

async function getLabel(label_id) {
  const query = ` SELECT *    
                  FROM label WHERE label_id = ?;`;

  return new Promise((resolve, reject) => {
    db.query(query, [label_id], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}

async function editLabel(label) {
  const query = ` UPDATE label
                  SET 
                    label_name = ?,
                    color = ?
                  WHERE 
                    label_id = ?;`;

  return new Promise((resolve, reject) => {
    db.query(
      query,
      [label.label_name, label.color, label.label_id],
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

async function deleteLabel(label_id) {
  const query = ` DELETE FROM label
                  WHERE 
                    label_id = ?;`;

  return new Promise((resolve, reject) => {
    db.query(query, [label_id], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results.affectedRows > 0);
      }
    });
  });
}

async function getAllLabelsAdmin() {
  const query = ` SELECT *
                  FROM label;`;

  return new Promise((resolve, reject) => {
    db.query(query, [], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}

module.exports = {
  createLabel,
  getLabels,
  getLabel,
  editLabel,
  deleteLabel,
  getAllLabelsAdmin,
};
