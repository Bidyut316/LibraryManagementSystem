const mdl = require('../models/models')
const bcrypt = require('bcryptjs')

// Create New User
async function NewUser(req, res) {
 try {
  const { role, name, email, password } = req.body
  if (role) {
   //const role = req.body.role;
   var role_obj = {}
   if (role == "student") {
    role_obj = { is_student: true }
   } else if (role == "librarian") {
    role_obj = { is_librarian: true }
   } else if (role == "faculty") {
    role_obj = { is_faculty: true }
   } else {
    res.json({ "msg": "User must have valid role" })
   }
   if (name && email && password) {
    const rand_str = await bcrypt.genSalt(10);
    const password2 = await bcrypt.hash(password, rand_str);
    // Create new user object
    const newuser = { name: name, email: email, password: password2 }
    const user = new mdl.user(newuser);
    await user.save()
    role_obj.userid = user.id;
    const user_role = new mdl.user_role(role_obj);
    await user_role.save()
    res.json({ msg: "New user is created", user: user }) // Returns the new user that is created in the database
   }
   else {
    res.json({ "error": "Please Provide valid data" })
   }
  }
  else {
   res.json({ "error": "User must have role" })
  }
 } catch (error) {
  res.json(error)
 }
}


// add New Book
async function add_book(req, res) {
 try {
  const { isbn, title, subject, description, copies, publish_date, pages } = req.body
  if (isbn && title && subject) {
   const obj = {
    isbn: isbn,
    title: title,
    subject: subject,
    description: description,
    copies_available: copies,
    publish_date: publish_date,
    pages: pages
   }
   const book = new mdl.book(obj);
   await book.save()
   res.json({ msg: "New Books Added", book: book })
  }
  else {
   res.json({ "error": "book must have isbn, title and subject" })
  }
 } catch (error) {
  res.json(error)
 }
}

// add new record
async function add_record(req, res) {
 try {
  const { userid, bookid, issue_date, return_date, return_status } = req.body
  if (userid && bookid) {
   const obj = {
    userid: userid,
    bookid: bookid,
    issue_date: issue_date,
    return_date: return_date,
    return_status: return_status
   }
   const record = new mdl.record(obj);
   await record.save()
   res.json({ msg: "New record saved", record: record })
  }
  else {
   res.json({ "error": "record must have user and book" })
  }
 } catch (error) {
  res.json(error)
 }
}

// add payment
async function add_payment(req, res) {
 try {
  const { userid, date, amount } = req.body
  if (userid && amount) {
   const obj = {
    userid: userid,
    date: date,
    amount: amount
   }
   const payment = new mdl.payment(obj);
   await payment.save()
   res.json({ msg: "Payment addes successfully", payment: payment })
  } else {
   res.json({ "error": "Payment Must have amount and user" })
  }
 } catch (error) {
  res.json(error)
 }
}

module.exports.NewUser = NewUser;
module.exports.add_book = add_book;
module.exports.add_record = add_record;
module.exports.add_payment = add_payment;



