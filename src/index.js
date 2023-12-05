import express from 'express';
import path from 'path';
import {fileURLToPath} from 'url';
import mediaRouter from './routes/media-router.mjs';
import userRouter from './routes/user-router.mjs';
import { errorHandler, logger, notFoundHandler } from './middlewares/middleware.mjs';
import authRouter from './routes/auth-router.mjs';
import helmet from 'helmet';

const hostname = '127.0.0.1';
const app = express();
const port = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('view engine', 'pug');
app.set('views', 'src/views');

// Reduce Fingerprinting (security)
app.disable('x-powered-by');

// set security-related headers (security)
app.use(helmet());

// parse incomiing JSON data from http requests
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/docs', express.static(path.join(__dirname, '../docs')));
app.use('/media', express.static(path.join(__dirname, '../uploads')));

// simpmle custom middleware for logging/debugging all requests
if (process.env.NODE_ENV !== 'production') {
  app.use(logger);
}

// using pug to render page
app.get('/', (req, res) => {
  const values = {
    title: "REST API docs",
    message: "Landing page using pug",
    info: "Implement a REST API by following  API reference with the mock data included in it",
    link: "https://github.com/mattpe/ucad/blob/main/assets/media-api-reference-v1.md"
  };
  res.render('home', values);
});

// auth endpoints
app.use('/api/auth', authRouter);

// media endpoints
app.use('/api/media', mediaRouter);

// user endpoints
app.use('/api/users', userRouter);

// All other routes => 404
app.use(notFoundHandler);
// default error handler
app.use(errorHandler);

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});



