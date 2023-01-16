const express = require('express');
const apartments = require('./service');

const app = express();
const hostname = '127.0.0.1';

const port = 4000;

app.use(express.json());

app.use(
  express.urlencoded({
    extend: true,
  })
);

app.get('/all/', async function(req, res, next) {
  try {
    let promise = await apartments.getApartments(req.query.limit)
    res.json(promise)
  } catch (err) {
    console.error(`Error while getting apartments `, err.message);
    next(err);
  }
});

app.get('/search/', async function(req, res, next) {
  try {
    let promise = await apartments.getApartmentsWithText(req.query.text, req.query.limit)
    res.json(promise)
  } catch (err) {
    console.error(`Error while getting apartments `, err.message);
    next(err);
  }
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ messafe: err.message });
  return
})

app.listen(port, hostname, () => {
  console.log(`Listening port http://${hostname}:${port}`);
})
