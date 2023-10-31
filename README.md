# ucad-examples-23
REST API for Assignment 1 - Getting started with node.js, Käyttäjäkeskeinen sovelluskehitys course
Base URL: http://127.0.0.1:3000/
1. Home page
   - Method: GET
   - URL: "/"
   - Retrieves welcome message
2. Get all items
   - Method: GET
   - URL: "/items"
   - Success 200: retrieves object which has list of all items
   - Error 404: receive a JSON response with a resource not found message
3. Get an item by its id 
   - Method: GET
   - URL: "/items/:id"
   - Success 200: retrieves item data, includes id and name
   - Error 404: receive a JSON response with item not found error message
   - Error 404: receive a JSON response with a resource not found message
4. Create a new item
   - Method: POST
   - URL: "/items/"
   - Exaample request:
       Content-Type: application/json
       {
         "name": "mansikka"
       }
   - Success 200: receive a JSON response with a success messaage
   - Error 400: receive a JSON response with missing data error message
   - Error 404: receive a JSON response with a resource not found message
5.  Delete an item by its id
   - Method: DELETE
   - URL: "/items/:id"
   - Success 202: receive a JSON response with an accepted messaage
   - Error 404: receive a JSON response with item not found error message
   - Error 404: receive a JSON response with a resource not found message
6. Update an item
   - Method: PUT
   - URL: "/items/:id"
   - Example request:
       Content-Type: application/json
       {
         "name": "päärynä"
       }
   - Success 200: receive a JSON response with a success messaage
   - Error 400: receive a JSON response with missing data error message
   - Error 404: receive a JSON response with a resource not found message
7. Get item quantity
   - Method: GET
   - URL: "/items-quantity"
   - Success 200: receive quantity of items data
   - Error 404: receive a JSON response with a resource not found message
