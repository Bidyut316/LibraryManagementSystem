const express = require('express');
const app = express();
app.use(express.json());
const Iview = require("./views/insertViews")
const Gview = require("./views/getDetailsView")
const Uview = require("./views/updateViews")
const Dview = require("./views/deleteViews")
const Sview = require("./views/searchViews")

// For User Authentication
const mdl = require('./models/models')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const verifi = require('./verifyToken')
let Tokn_list = []




// add user data
app.post('/users', async (req, res) => {
 Iview.NewUser(req, res)
})

// get user data
app.get('/users/:id', verifi.auth, async (req, res) => {
 Gview.get_details(req, res, "user")
})

// update user data
app.put('/users/:id', verifi.auth, async (req, res) => {
 Uview.user_update(req, res)
})

// Delete User data
app.delete('/users/:id', verifi.auth, async (req, res) => {
 Dview.user_delete(req, res)
})
// add book data
app.post('/books', verifi.auth, async (req, res) => {
 Iview.add_book(req, res)
})

// get book data
app.get('/books/:id', verifi.auth, async (req, res) => {
 Gview.get_details(req, res, "book")
})

// update book data
app.put('/books/:id', verifi.auth, async (req, res) => {
 Uview.book_update(req, res)
})

// Delete Book data
app.delete('/books/:id', verifi.auth, async (req, res) => {
 Dview.book_delete(req, res)
})

// add records
app.post('/records', verifi.auth, async (req, res) => {
 Iview.add_record(req, res)
})

// get records
app.get('/records/:id', verifi.auth, async (req, res) => {
 Gview.get_details(req, res, "record")
})

// update record data
app.put('/records/:id', verifi.auth, async (req, res) => {
 Uview.record_update(req, res)
})

// Delete record data
app.delete('/records/:id', verifi.auth, async (req, res) => {
 Dview.record_delete(req, res)
})

// add payment
app.post('/payments', verifi.auth, async (req, res) => {
 Iview.add_payment(req, res)
})

// get payment
app.get('/payments/:id', verifi.auth, async (req, res) => {
 Gview.get_details(req, res, "payment")
})

// update payment data
app.put('/payments/:id', verifi.auth, async (req, res) => {
 Uview.payment_update(req, res)
})

// Delete payment data
app.delete('/payments/:id', verifi.auth, async (req, res) => {
 Dview.payment_delete(req, res)
})

// Search User Data

app.get('/users', verifi.auth, async (req, res) => {
 Sview.search_user(req, res)
})

// Search Book Data

app.get('/books', verifi.auth, async (req, res) => {
 Sview.search_book(req, res)
})

// Search Record Data

app.get('/records', verifi.auth, async (req, res) => {
 Sview.all_records(req, res)
})

// Search Payment data

app.get('/payments', verifi.auth, async (req, res) => {
 Sview.all_payments(req, res)
})

//  User Authentication

// Generate authorization token
app.post('/users/getToken', async (req, res) => {
 try {
  const user = await mdl.user.findOne({ where: { email: req.body.email } })
  if (!user) {
   return res.status(400).send("Email or Password is Wrong");
  }
  const valid_password = await bcrypt.compare(req.body.password, user.password)
  if (valid_password) {
   const token = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET)
   Tokn_list.push(token)
   res.header('auth_token', token).send(token)
   //return res.status(400).send(token);
  } else {
   return res.status(400).send("Email or Password is Wrong");
  }
 } catch (error) {
  res.json({ error })
 }
})

// Renewed access token

app.post('/users/refreshToken', async (req, res) => {
 const refreshToken = req.body.Token
 if (refreshToken == null) {
  return res.sendStatus(401)
 }
 if (!Tokn_list.includes(refreshToken)) {
  return res.sendStatus(403)
 }
 jwt.verify(refreshToken, process.env.TOKEN_SECRET, (err, user) => {
  if (err) return res.sendStatus(403)
  const accessToken = generateAccessToken({ email: user.email })
  res.header('auth_token', accessToken).send(accessToken)
  //res.json({ auth_token: accessToken })
 })
})

function generateAccessToken(user) {
 return jwt.sign(user, process.env.TOKEN_SECRET, { expiresIn: '15s' })
}


app.listen(8000);