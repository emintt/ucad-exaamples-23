import express from 'express';
import path from 'path';
import {fileURLToPath} from 'url';
import { getItemById, getItems, postItem } from './items.js';


const hostname = '127.0.0.1';
const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('view engine', 'pug');
app.set('views', 'src/views');

// parse incoming JSON data from http requests
app.use(express.json());
// käsittelee, sido toiminnallisuus
// public on juuressa kansiossa 
// app.use(express.static('public'));
app.use('/docs', express.static(path.join(__dirname, '../public')))


// next: käynnistää seuraavan ..?
// simpmle custom middleware log/debug all requests
app.use((req, res, next) => {
  console.log('Time:', req.method, req.url, Date.now());
  next();
});

app.get('/', (req, res) => {
  // res.send('Welcome to my REST API!');
  const values = {title: "Dummy RESR API docs", message: "TODO: Docs!"};
  res.render('home', values);
});





// ei tarvitse käyttää JSON response
app.get('/kukkuu', (request, response) => {
  const myResponse = {message: "Hello again"};
  response.status(400);
  // response.json/..send: tekee lähettämistä
  response.json(myResponse);
  response.sendStatus(200);
  // ..json() lähetti vastaus jo, tuo sendSatus ei ole vaikutusta, koska se tulee vastaa sen jälkeen
});

// jos kirjoittaa selaimessa ../kukkuu, tää ei toteuta vaan ylhäällä oleva koodi
app.get('/:message', (req, res) => {
  // res.send('Welcome to my REST API!');
  const values = {title: "Dummy RESR API docs", message: req.params.message};
  res.render('home', values);
});

// example generic icon api
// get all items
app.get('/api/items', getItems);

// get item by id
app.get('/api/items/:id', getItemById);

// edit
app.put('/api/items');

// add new item
app.post('/api/items', postItem);

// delete
app.delete('/api/items');

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