// index.js
import http from 'http';
import { getItems, getItemById, postItem, deleteItem, putItem, getQuantity } from './items.js';
const hostname = '127.0.0.1';
const port = 3000;


// we created an HTTP server object
const server = http.createServer((req, res) => {
  console.log('resquest', req.method, req.url);
  const {method, url} = req;
  const reqParts = url.split('/');
  // TODO: test method, url and generate response accordingly (=routing)
  if (method === 'GET' && url === '/') {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<h1>Welcome to my Api</h1>');
    res.write('<p>Documentation here</p>');
    res.end();
  }  else if (method === 'GET' && reqParts[1] === 'items' &&
        reqParts[2]) {
    console.log('GETting item with id', reqParts[2]);
    getItemById(res, reqParts[2]);
  } else if (method === 'GET' && reqParts[1] === 'items') {
    console.log('GETting items');
    getItems(res);
  } else if (method === 'POST' && reqParts[1] === 'items') {
    console.log('POSTing a new item');
    postItem(req, res);
  } else if (method === 'DELETE' && reqParts[1] === 'items' &&
        reqParts[2]) {
    console.log('DELETing an item');
    deleteItem(res, reqParts[2]);
  } else if (method === 'PUT' && reqParts[1] === 'items' &&
        reqParts[2]) {
    console.log('UPDATing an item');
    putItem(req, res, reqParts[2]);
  } else if (method === 'GET' && reqParts[1] === 'items-quantity') {
    console.log('GETting quantity of items');
    getQuantity(res);
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end('{"message": "404 Resource not found"}');
  }
 
});

// then attached a listener to the request event
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});