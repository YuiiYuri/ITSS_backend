const db = require("../services/SetUpMySQL");

async function createFilter(filter, user_id) {
  const query = ` INSERT INTO filter ( 
                    filter_name, 
                    color) 
                  VALUES (?, ?);`;

  return new Promise((resolve, reject) => {
    db.query(query, [filter.filter_name, filter.color], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}

async function getFilters() {
  const query = ` SELECT *    
                  FROM filter;`;

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

async function getFilter(filter_id) {
  const query = ` SELECT *    
                  FROM filter WHERE filter_id = ?;`;

  return new Promise((resolve, reject) => {
    db.query(query, [filter_id], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}

async function editFilter(filter, user_id) {
  const query = ` UPDATE filter
                  SET 
                    filter_name = ?,
                    color = ?
                  WHERE 
                    filter_id = ?;`;

  return new Promise((resolve, reject) => {
    db.query(
      query,
      [filter.filter_name, filter.color, filter.filter_id],
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

async function deleteFilter(filter_id, user_id) {
  const query = ` DELETE FROM filter
                  WHERE 
                    filter_id = ?;`;

  return new Promise((resolve, reject) => {
    db.query(query, [filter_id, user_id], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results.affectedRows > 0);
      }
    });
  });
}

module.exports = {
  createFilter,
  getFilters,
  getFilter,
  editFilter,
  deleteFilter,
};
