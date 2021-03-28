const mdl = require('../models/models')
const bcrypt = require('bcryptjs') // For decrypt password if show


async function get_details(req, res, model) {
 const Id = req.params.id

 if (model == "user") {
  try {
   const user = await mdl.user.findOne({
    include: [mdl.user_role],
    where: { id: Id }
   })
   res.json({ user })
  } catch (error) {
   res.json({ error })
  }
 }

 if (model == "book") {
  try {
   const book = await mdl.book.findOne({
    where: { id: Id }
   })
   res.json({ book })
  } catch (error) {
   res.json({ error })
  }
 }

 if (model == "payment") {
  try {
   const payment = await mdl.payment.findOne({
    include: [mdl.user],
    where: { id: Id }
   })
   res.json({ payment })
  } catch (error) {
   res.json({ error })
  }
 }

 if (model == "record") {
  try {
   const record = await mdl.record.findOne({
    include: [mdl.user, mdl.book],
    where: { id: Id }
   })
   res.json({ record })
  } catch (error) {
   res.json({ error })
  }
 }

}


module.exports.get_details = get_details;
