const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3010;

let cors = require('cors');

app.use(cors());

let cart = [
  { productId: 1, name: 'Laptop', price: 50000, quantity: 1 },
  { productId: 2, name: 'Mobile', price: 20000, quantity: 2 }
];
function  updateCart(productId, name, price, quantity){
 cart.push({productId: productId, name: name, price: price, quantity: quantity})
  return cart;
}
app.get("/cart/add", (req, res) =>{
  productId = parseInt(req.query.productId);
  name = req.query.name;
  price = parseFloat(req.query.price);
  quantity = parseInt(req.query.quantity);
  let result = updateCart(productId, name, price, quantity);
  res.json(result)

})


function editCart(productId, quantity){
  for(let i=0; i<cart.length; i++){
    if(cart[i].productId === productId){
      cart[i].quantity = quantity;
      return cart;
    }
  }
}
app.get("/cart/edit", (req, res) =>{
  productId = parseInt(req.query.productId);
  quantity = parseInt(req.query.quantity);
  let result = editCart(productId, quantity);
  res.json(result)

})

function deleteCart(cart, productId){
  return cart.productId !== productId;
}
app.get("/cart/delete",(req, res)=>{
  productId = parseInt(req.query.productId);
  let result = cart.filter(cart=>deleteCart(cart, productId));
  res.json(result)
})
app.get("/cart", (req, res) =>{
  res.json(cart)
})

function calculateTotalQuantity(cart) {
  let totalQuantity = 0;

  for (let i = 0; i < cart.length; i++) {
    totalQuantity += cart[i].quantity;
  }

  return totalQuantity;
}

app.get('/cart/total-quantity', (req, res) => {
  let totalQuantity = calculateTotalQuantity(cart);
  res.json({ totalQuantity: totalQuantity });
});

function calculateTotalPrice(cart) {
  let totalPrice = 0;

  for (let i = 0; i < cart.length; i++) {
    totalPrice += cart[i].price * cart[i].quantity;
  }

  return totalPrice;
}

app.get('/cart/total-price', (req, res) => {
  let totalPrice = calculateTotalPrice(cart);
  res.json({ totalPrice: totalPrice });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
