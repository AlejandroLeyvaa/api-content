const express = require('express');
// const cors = require('cors');

const { config } = require('./config/index');

const app = express();
const contentApi = require('./routes/content');
const productsApi = require('./routes/products');
const authApi = require('./routes/auth');

const {
  logErrors,
  wrapErrors,
  errorHandler
} = require('./utils/middleware/errorHandlers.js');

const notFoundHandler = require('./utils/middleware/notFoundHandler');

app.use(express.json());
app.use(express.urlencoded({extended: false}));
// app.use(cors());

app.get('/', (req, res, next) => {
  res.send({"Hello": "World"});
});

authApi(app);
contentApi(app);
productsApi(app);

app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);
app.use(notFoundHandler);

app.listen(config.port, () => {
  console.log(`Listen on http://localhost:${config.port}`);
});