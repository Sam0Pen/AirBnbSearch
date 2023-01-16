
const db = require('./db');

const getApartments = (limit = 1000) => {
  let sql = `SELECT *                          
              FROM apartment
              LIMIT ?`;

  return new Promise((resolve, reject) => {
    db.serialize(() => {
      db.all(sql, limit, (err, rows) => {
        if (err) reject(err);
        resolve(rows);
      })
    })
  });
};

const getApartmentsWithText = (text, limit=1000) => {
  let sqlText = `%${text}%`;
  let likeSql = `SELECT *             
              FROM apartment
              WHERE city LIKE ?
              OR name LIKE ?
              OR room_type LIKE ?
              OR host_name LIKE ?
              OR neighbourhood_group LIKE ?
              OR neighbourhood LIKE ?
              OR state LIKE ?
              LIMIT ?`;
  let limitSql = `SELECT *                          
              FROM apartment
              LIMIT ?`;

  return new Promise((resolve, reject) => {
    db.serialize(() => {
     if (text) {
        db.all(likeSql, [sqlText, sqlText, sqlText, sqlText, sqlText, sqlText, sqlText, limit], (err, rows) => {
          if (err) reject(err);
          resolve(rows);
        })
      } else {
        db.all(limitSql, limit, (err, rows) => {
          if (err) reject(err);
          resolve(rows);
        })
      }
    })
  });
}

module.exports = {
  getApartments,
  getApartmentsWithText
}