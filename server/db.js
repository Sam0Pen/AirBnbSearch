const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
const filepath = './apartment.db';

function connectToDatabase() {
  if (fs.existsSync(filepath)) {
    console.log('exists');
    return new sqlite3.Database(filepath);
  } else {
    const db = new sqlite3.Database(filepath, (error) => {
      if (error) {
        return console.error(error.message);
      }
      createTable(db);
      console.log('Connected to the database successfully');
    });
    return db;
  }
}

function createTable(db) {
  db.exec(`
  CREATE TABLE apartment
  (
    id  VARCHAR(10),
    name                            VARCHAR(50),
    host_id                         VARCHAR(50),
    host_name                       VARCHAR(20),
    neighbourhood_group             VARCHAR(10),
    neighbourhood                   VARCHAR(50),
    latitude                        VARCHAR(50),
    longitude                       VARCHAR(50),
    room_type                       VARCHAR(10),
    price                           VARCHAR(10),
    minimum_nights                  VARCHAR(10),
    number_of_reviews               VARCHAR(10),
    last_review                     VARCHAR(10),
    reviews_per_month               VARCHAR(10),
    calculated_host_listings_count  VARCHAR(10),
    availability_365                VARCHAR(10),
    number_of_reviews_ltm           VARCHAR(10),
    license                         VARCHAR(10),
    state                           VARCHAR(10),
    city                            VARCHAR(10)
  )
`);
}

module.exports = connectToDatabase();
