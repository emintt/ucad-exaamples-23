// mock items data
const items = [
  {id: 5, name: "porkkana"}, 
  {id: 8, name: "omena"}, 
  {id: 13, name: "appelsiini"}
];

const getItems = (res) => {
  res.writeHead(200, {'Content-Type': 'application/json'});
  const jsonItems = JSON.stringify(items);
  res.end(`{"message": "all items", "items": ${jsonItems} }`);
}

const getItemById = (res, id) => {
  // TODO: if item with id exists, send it, otherwise send 404
  console.log('getElementById', id);
  const item = items.find((elememt) => elememt.id === parseInt(id));
  console.log(item);
  if (item) {
    res.writeHead(200, {'Content-Type': 'application/json'});
    // temp hardcoded response should be replaced with an item in mock data
    // const item = {id: 5, name: "porkkana"};
    res.end(JSON.stringify(item));
  } else {
    res.writeHead(404, {'Content-Type': 'application/json'});
    res.end(`{"message": "item not found"}`);
  }
}

const postItem = (req, res) => {
  let body = [];
  req
    .on('error', (err) => {
      console.log(err);        
    })
    .on('data', (chunk) => {
        body.push(chunk);
    })
    .on('end', () => {
        body = Buffer.concat(body).toString();
        console.log('request body', body);
        body = JSON.parse(body);
        // check if body is "valid"
        if (!body.name) {
          res.writeHead(400, {'Content-Type': 'application/json'});
          res.end(`{"message": "Missing data."}`);
          return;
        }
        // check id of the last item in items and add 1
        const newId = items[items.length-1].id + 1;

        items.push({id: newId, name: body.name});
        res.writeHead(201, {'Content-Type': 'application/json'});
        res.end(`{"message": "New item added"}`);
    })
}

// TODO: add deleteItem(), putItem() and routing for those in index.js

const deleteItem = (res, id) => {
  // if item with id exists, delete it, otherwise send 404
  console.log('item id', id);
  const itemIndex = items.findIndex((elememt) => elememt.id === parseInt(id));
  console.log(itemIndex);
  if (itemIndex !== -1) {
    items.splice(itemIndex, 1);
    res.writeHead(202, {'Content-Type': 'application/json'});
    res.end(`{"message": "item deleted"}`);
  } else {
    res.writeHead(404, {'Content-Type': 'application/json'});
    res.end(`{"message": "item not found"}`);
  }
}

const putItem = (req, res, id) => {
  let body = [];
  req 
    .on('error', (err) => {
      console.log(err);
    })
    .on('data', (chunk) => {
      body.push(chunk);
    })
    .on('end', () => {
      body = Buffer.concat(body).toString();
      console.log('request body', body);
      body = JSON.parse(body);
      // check if body is "valid"
      if (!body.name) {
        res.writeHead(400, {'Content-Type': 'application/json'});
        res.end(`{"message": "Missing data."}`);
        return;
      }
      // if item with id exists, update it, otherwise send 404
      console.log('item id', id);
      const item = items.find((element) => element.id === parseInt(id));
      if (item) {
        item.name = body.name;
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(`{"message": "item updated"}`);
        return;
      } 
      res.writeHead(404, {'Content-Type': 'application/json'});
      res.end(`{"message": "item not found"}`);
    });
}

const getQuantity = (res) => {
  const quantity = items.length;
  res.writeHead(200, {'Content-Type': 'application/json'});
  // const jsonItems = JSON.stringify(items);
  res.end(`{"message": "quantity of items", "quantity": ${quantity} }`);
}


export {getItems, getItemById, postItem, deleteItem, putItem, getQuantity};