// mock items data
const items = [
  {id: 5, name: "porkkana"}, 
  {id: 8, name: "omena"}, 
  {id: 13, name: "appelsiini"}
];

/**
 * Get all items
 * @param {object} req - http request
 * @param {object} res - http response
 */

const getItems = (req, res) => {
  let limit = req.query.limit; 
  // check that the value is int before using
  console.log('is interger', Number.isInteger(+limit));
  if (limit && Number.isInteger(+limit)) {
    res.json(items.slice(0, limit));
  } else {
    res.json(items);
  }
}

const getItemById = (req, res) => {
  // TODO: if item with id exists, send it, otherwise send 404
  console.log('getElementById', req.params.id);
  const item = items.find((elememt) => elememt.id === parseInt(req.params.id));
  console.log(item);
  if (item) {
    res.json(item);
  } else {
    res.status(404);
    res.json({message: "item not found"});
  }
}

const postItem = (req, res) => {
  console.log('new item posted', req.body);
  // check id of the last item in items and add 1   
  const newId = items[items.length-1].id + 1;
  if (req.body.name) {
    items.push({id: newId, name: req.body.name});
    // res.sendStatus(201);
    res.status(201).json({message: "New item added."});
  } else {
    res.status(400).json({message: "Missing data"});
  }
}

// TODO: add deleteItem(), putItem() and routing for those in index.js

const deleteItem = (req, res) => {
  // if item with id exists, delete it, otherwise send 404
  console.log('item id', req.params.id);
  const itemIndex = items.findIndex((elememt) => elememt.id === parseInt(req.params.id));
  console.log(itemIndex);
  if (itemIndex !== -1) {
    items.splice(itemIndex, 1);
    res.status(202).json({message: "item deleted"});
  } else {
    res.status(404).json({message: "item not found"});
  }
}

const putItem = (req, res) => {
  console.log('item id', req.params.id);
  console.log('request body name', req.body.name);
  const item = items.find((element) => element.id === parseInt(req.params.id));
  // check if request body valid
  // if item exists, edit it, otherwise send 404 
  if (req.body.name) {
    if (item) {
      item.name = req.body.name;
      res.json({message: "item updated"});
    } else {
      res.status(404).json({message: "item not found"});
    }  
  } else {
    res.status(400).json({message: "missing data (name)"});
  }
  
}

const getQuantity = (req, res) => {
  const quantity = items.length;
  res.json({message: "quantity of items", quantity: quantity});
}


export {getItems, getItemById, postItem, deleteItem, putItem, getQuantity};


// const getItems = (res) => {
//   res.writeHead(200, {'Content-Type': 'application/json'});
//   const jsonItems = JSON.stringify(items);
//   res.end(`{"message": "all items", "items": ${jsonItems} }`);
// }

// const getItemById = (res, id) => {
//   // TODO: if item with id exists, send it, otherwise send 404
//   console.log('getElementById', id);
//   const item = items.find((elememt) => elememt.id === parseInt(id));
//   console.log(item);
//   if (item) {
//     res.writeHead(200, {'Content-Type': 'application/json'});
//     // temp hardcoded response should be replaced with an item in mock data
//     // const item = {id: 5, name: "porkkana"};
//     res.end(JSON.stringify(item));
//   } else {
//     res.writeHead(404, {'Content-Type': 'application/json'});
//     res.end(`{"message": "item not found"}`);
//   }
// }

// const postItem = (req, res) => {
//   let body = [];
//   req
//     .on('error', (err) => {
//       console.log(err);        
//     })
//     .on('data', (chunk) => {
//         body.push(chunk);
//     })
//     .on('end', () => {
//         body = Buffer.concat(body).toString();
//         console.log('request body', body);
//         body = JSON.parse(body);
//         // check if body is "valid"
//         if (!body.name) {
//           res.writeHead(400, {'Content-Type': 'application/json'});
//           res.end(`{"message": "Missing data."}`);
//           return;
//         }
//         // check id of the last item in items and add 1
//         const newId = items[items.length-1].id + 1;

//         items.push({id: newId, name: body.name});
//         res.writeHead(201, {'Content-Type': 'application/json'});
//         res.end(`{"message": "New item added"}`);
//     })
// }

// // TODO: add deleteItem(), putItem() and routing for those in index.js

// const deleteItem = (res, id) => {
//   // if item with id exists, delete it, otherwise send 404
//   console.log('item id', id);
//   const itemIndex = items.findIndex((elememt) => elememt.id === parseInt(id));
//   console.log(itemIndex);
//   if (itemIndex !== -1) {
//     items.splice(itemIndex, 1);
//     res.writeHead(202, {'Content-Type': 'application/json'});
//     res.end(`{"message": "item deleted"}`);
//   } else {
//     res.writeHead(404, {'Content-Type': 'application/json'});
//     res.end(`{"message": "item not found"}`);
//   }
// }

// const putItem = (req, res, id) => {
//   let body = [];
//   req 
//     .on('error', (err) => {
//       console.log(err);
//     })
//     .on('data', (chunk) => {
//       body.push(chunk);
//     })
//     .on('end', () => {
//       body = Buffer.concat(body).toString();
//       console.log('request body', body);
//       body = JSON.parse(body);
//       // check if body is "valid"
//       if (!body.name) {
//         res.writeHead(400, {'Content-Type': 'application/json'});
//         res.end(`{"message": "Missing data."}`);
//         return;
//       }
//       // if item with id exists, update it, otherwise send 404
//       console.log('item id', id);
//       const item = items.find((element) => element.id === parseInt(id));
//       if (item) {
//         item.name = body.name;
//         res.writeHead(200, {'Content-Type': 'application/json'});
//         res.end(`{"message": "item updated"}`);
//         return;
//       } 
//       res.writeHead(404, {'Content-Type': 'application/json'});
//       res.end(`{"message": "item not found"}`);
//     });
// }

// const getQuantity = (res) => {
//   const quantity = items.length;
//   res.writeHead(200, {'Content-Type': 'application/json'});
//   // const jsonItems = JSON.stringify(items);
//   res.end(`{"message": "quantity of items", "quantity": ${quantity} }`);
// }


// export {getItems, getItemById, postItem, deleteItem, putItem, getQuantity};