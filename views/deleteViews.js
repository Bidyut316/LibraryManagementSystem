const mdl = require('../models/models')

// delete user

async function user_delete(req, res) {
 try {
  let user = await mdl.user.findOne({
   include: [mdl.user_role],
   where: {
    id: req.params.id
   }
  })
  if (user) {
   let d_user = await mdl.user.destroy({
    where: {
     id: req.params.id
    }
   });
   /*let r_user = await mdl.user_role.destroy({
    where: {
     id: user.user_role.id
    }
   });*/

   let result = {};
   result.msg = "Delete Successfully"
   result.data = user;
   return res.status(200).send(result);
  } else {
   return res.status(404).send("Data Not Found");
  }
 } catch (error) {
  res.json({ error })
 }
}

// Delete Book

async function book_delete(req, res) {
 try {
  const book = await mdl.book.findOne({
   where: { id: req.params.id }
  })
  if (book) {
   const d_book = await mdl.book.destroy({
    where: {
     id: req.params.id
    }
   });
   return res.status(200).send({ "msg": "Delete Successfully", "book": book });
  } else {
   return res.status(404).send("Data Not Found");
  }
 } catch (error) {
  res.json({ error })
 }
}

// Delete Records

async function record_delete(req, res) {
 try {
  const record = await mdl.record.findOne({
   where: { id: req.params.id }
  })
  if (record) {
   const d_record = await mdl.record.destroy({
    where: {
     id: req.params.id
    }
   });
   return res.status(200).send({ "msg": "Delete Successfully", "record": record });
  } else {
   return res.status(404).send("Data Not Found");
  }
 } catch (error) {
  res.json({ error })
 }
}

// Delete Payment

async function payment_delete(req, res) {
 try {
  const payment = await mdl.payment.findOne({
   where: { id: req.params.id }
  })
  if (payment) {
   const d_payment = await mdl.payment.destroy({
    where: {
     id: req.params.id
    }
   });
   return res.status(200).send({ "msg": "Delete Successfully", "payment": payment });
  } else {
   return res.status(404).send("Data Not Found");
  }
 } catch (error) {
  res.json({ error })
 }
}


module.exports.user_delete = user_delete;
module.exports.book_delete = book_delete;
module.exports.record_delete = record_delete;
module.exports.payment_delete = payment_delete;



