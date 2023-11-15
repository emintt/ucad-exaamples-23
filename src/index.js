import express from 'express';
import path from 'path';
import {fileURLToPath} from 'url';
import mediaRouter from './routes/media-router.mjs';
import userRouter from './routes/user-router.mjs';
import { logger } from './middlewares/middleware.mjs';


const hostname = '127.0.0.1';
const app = express();
const port = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('view engine', 'pug');
app.set('views', 'src/views');

// parse incoming JSON data from http requests
app.use(express.json());
app.use('/docs', express.static(path.join(__dirname, '../docs')));
app.use('/media', express.static(path.join(__dirname, '../uploads')));

// simpmle custom middleware for logging/debugging all requests
app.use(logger);

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

// media endpoints
app.use('/api/media', mediaRouter);

// user endpoints
app.use('/api/user', userRouter);

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});



// // index.js
// import http from 'http';
// import { getItems, getItemById, postItem, deleteItem, putItem, getQuantity } from './items.js';
// const hostname = '127.0.0.1';
// const port = 3000;


// // we created an HTTP server object
// const server = http.createServer((req, res) => {
//   console.log('resquest', req.method, req.url);
//   const {method, url} = req;
//   const reqParts = url.split('/');
//   // TODO: test method, url and generate response accordingly (=routing)
//   if (method === 'GET' && url === '/') {
//     res.writeHead(200, {'Content-Type': 'text/html'});
//     res.write('<h1>Welcome to my Api</h1>');
//     res.write('<p>Documentation here</p>');
//     res.end();
//   }  else if (method === 'GET' && reqParts[1] === 'items' &&
//         reqParts[2]) {
//     console.log('GETting item with id', reqParts[2]);
//     getItemById(res, reqParts[2]);
//   } else if (method === 'GET' && reqParts[1] === 'items') {
//     console.log('GETting items');
//     getItems(res);
//   } else if (method === 'POST' && reqParts[1] === 'items') {
//     console.log('POSTing a new item');
//     postItem(req, res);
//   } else if (method === 'DELETE' && reqParts[1] === 'items' &&
//         reqParts[2]) {
//     console.log('DELETing an item');
//     deleteItem(res, reqParts[2]);
//   } else if (method === 'PUT' && reqParts[1] === 'items' &&
//         reqParts[2]) {
//     console.log('UPDATing an item');
//     putItem(req, res, reqParts[2]);
//   } else if (method === 'GET' && reqParts[1] === 'items-quantity') {
//     console.log('GETting quantity of items');
//     getQuantity(res);
//   } else {
//     res.writeHead(404, { 'Content-Type': 'application/json' });
//     res.end('{"message": "404 Resource not found"}');
//   }
 
// });

// // then attached a listener to the request event
// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });