import express from 'express';
import morgan from 'morgan';
import history from 'connect-history-api-fallback';
import apiV1Router from './src/api/routes/index.js';
import HttpError from './src/api/errors/httpError.js';

const app = express();

app.use(morgan('tiny'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/v1', apiV1Router);

history({
  index: './dist/index.html',
});

//Application-level middleware
app.use(history());
app.use('/public', express.static('./public'));
app.use('/src', express.static('./src'));
app.use(express.static('./dist'));

app.get('/', (req, res) => {
  res.sendFile('./dist/index.html');
});

app.use((req, res) => {
  return res.status(404).json({
    description: 'Page not found',
  });
});

// eslint-disable-next-line
app.use((err, req, res, next) => {
  if (err instanceof HttpError) {
    return res.status(err.status).json({ ...err, message: err.message });
  }
  console.log('Internal server error', err);

  return res.status(500).json({
    message: 'INTERNAL_SERVER_ERROR',
  });
});

//слушаем порт
const port = process.env.PORT;

const start = () => {
  app.listen(port, () => {
    console.log(`Connection opened on port ${port}`);
  });
};

start();

export default app;

//TODO: in all controllers replace try/catch with wrapping function and errorhandler

//TODO: create a route and controller for classes (groups, personal, rented)

//TODO: create a calendar for all classes (table, router, controller, page, etc.)
