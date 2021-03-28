const mdl = require('../models/models')

// User Update

async function user_update(req, res) {
 try {
  let user = await mdl.user.findOne({
   where: {
    id: req.params.id
   }
  })
  if (user) {
   // update user model
   const [numberOfAffectedRows, affectedRows] = await mdl.user.update(
    req.body, {
    where: { id: req.params.id },
    returning: true, // needed for affectedRows to be populated
    plain: true // makes sure that the returned instances are just plain objects
   })
   const role = req.body.role
   var role_obj = {}
   if (role) {
    // update role model
    if (role == "student") {
     role_obj.is_student = true
     role_obj.is_faculty = false
     role_obj.is_librarian = false
    } else if (role == "faculty") {
     role_obj.is_faculty = true
     role_obj.is_student = false
     role_obj.is_librarian = false
    } else if (role == "librarian") {
     role_obj.is_librarian = true
     role_obj.is_student = false
     role_obj.is_faculty = false
    }

    var [number, rows] = await mdl.user_role.update(
     role_obj, {
     where: { userid: affectedRows.id },
     returning: true, // needed for affectedRows to be populated
     plain: true // makes sure that the returned instances are just plain objects
    })
   }
   const ob = { "User": affectedRows, "user_role": rows }
   res.json(ob)
  } else {
   return res.status(404).send("Data Not Found");
  }
 } catch (error) {
  res.json({ error })
 }
}

// Book Update

async function book_update(req, res) {
 try {
  let book = await mdl.book.findOne({
   where: {
    id: req.params.id
   }
  })
  if (book) {
   const [numberOfAffectedRows, affectedRows] = await mdl.book.update(
    req.body, {
    where: { id: req.params.id },
    returning: true, // needed for affectedRows to be populated
    plain: true // makes sure that the returned instances are just plain objects
   })
   res.json(affectedRows)
  } else {
   return res.status(404).send("Data Not Found");
  }
 } catch (error) {
  res.json({ error })
 }
}

// Record Update

async function record_update(req, res) {
 try {
  let record = await mdl.record.findOne({
   where: {
    id: req.params.id
   }
  })
  if (record) {
   const [numberOfAffectedRows, affectedRows] = await mdl.record.update(
    req.body, {
    where: { id: req.params.id },
    returning: true, // needed for affectedRows to be populated
    plain: true // makes sure that the returned instances are just plain objects
   })
   res.json(affectedRows)
  } else {
   return res.status(404).send("Data Not Found");
  }
 } catch (error) {
  res.json({ error })
 }
}

// Payment Update

async function payment_update(req, res) {
 try {
  let payment = await mdl.payment.findOne({
   where: {
    id: req.params.id
   }
  })
  if (payment) {
   const [numberOfAffectedRows, affectedRows] = await mdl.payment.update(
    req.body, {
    where: { id: req.params.id },
    returning: true, // needed for affectedRows to be populated
    plain: true // makes sure that the returned instances are just plain objects
   })
   res.json(affectedRows)
  } else {
   return res.status(404).send("Data Not Found");
  }
 } catch (error) {
  res.json({ error })
 }
}


module.exports.user_update = user_update;
module.exports.book_update = book_update;
module.exports.record_update = record_update;
module.exports.payment_update = payment_update;

