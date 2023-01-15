
const db = require('./db');

const getApartments = (limit = 20) => {

  let sql = `SELECT id,
                    name,
                    host_id,
                    host_name,
                    neighbourhood_group,
                    neighbourhood,
                    latitude,
                    longitude,
                    room_type,
                    price,
                    minimum_nights,
                    number_of_reviews,
                    last_review,
                    reviews_per_month,
                    calculated_host_listings_count,
                    availability_365,
                    number_of_reviews_ltm,
                    license,
                    state,
                    city                          
                FROM apartment LIMIT ?`;

  return new Promise((resolve, reject) => {
    db.serialize(() => {
      db.all(sql, limit, (err, rows) => {
        if (err) reject(err);
        resolve(rows);
      })
    })
  });
};

module.exports = {
  getApartments
}