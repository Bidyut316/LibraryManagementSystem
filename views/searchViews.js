const mdl = require('../models/models')

// User
async function search_user(req, res) {
 try {
  const { search, filter, sort } = req.body

  if (search && filter && sort) {
   console.log("Search filter sort")
   ////////////////////
   if (filter.category == "student") {
    var user = await mdl.user.findAll({
     include: [{ model: mdl.user_role, where: { is_student: true } }],
     where: { name: search.name },
     order: [["name", sort.name], ["createdAt", sort.registration_date]]
    })
   } else if (filter.category == "librarian") {
    var user = await mdl.user.findAll({
     include: [{ model: mdl.user_role, where: { is_librarian: true } }],
     where: { name: search.name },
     order: [["name", sort.name], ["createdAt", sort.registration_date]]
    })
   } else if (filter.category == "faculty") {
    var user = await mdl.user.findAll({
     include: [{ model: mdl.user_role, where: { is_faculty: true } }],
     where: { name: search.name },
     order: [["name", sort.name], ["createdAt", sort.registration_date]]
    })
   } else {
    return res.status(404).send("Data Not Found");
   }
   ///////////////////
  } else {
   if (search && filter) {
    console.log("search filter")
    //////////
    if (filter.category == "student") {
     var user = await mdl.user.findAll({
      include: [{ model: mdl.user_role, where: { is_student: true } }],
      where: { name: search.name }
     })
    } else if (filter.category == "librarian") {
     var user = await mdl.user.findAll({
      include: [{ model: mdl.user_role, where: { is_librarian: true } }],
      where: { name: search.name },
     })
    } else if (filter.category == "faculty") {
     var user = await mdl.user.findAll({
      include: [{ model: mdl.user_role, where: { is_faculty: true } }],
      where: { name: search.name },
     })
    } else {
     return res.status(404).send("Data Not Found");
    }
    //////////
   } else if (filter && sort) {
    console.log("filter sort")
    ////////////
    if (filter.category == "student") {
     var user = await mdl.user.findAll({
      include: [{ model: mdl.user_role, where: { is_student: true } }],
      order: [["name", sort.name], ["createdAt", sort.registration_date]]
     })
    } else if (filter.category == "librarian") {
     var user = await mdl.user.findAll({
      include: [{ model: mdl.user_role, where: { is_librarian: true } }],
      order: [["name", sort.name], ["createdAt", sort.registration_date]]
     })
    } else if (filter.category == "faculty") {
     var user = await mdl.user.findAll({
      include: [{ model: mdl.user_role, where: { is_faculty: true } }],
      order: [["name", sort.name], ["createdAt", sort.registration_date]]
     })
    } else {
     return res.status(404).send("Data Not Found");
    }
    /////////////
   } else if (search && sort) {
    console.log("search sort")
    var user = await mdl.user.findAll({
     include: [{ model: mdl.user_role }],
     where: { name: search.name },
     order: [["name", sort.name], ["createdAt", sort.registration_date]]
    })
   } else {
    if (search) {
     console.log("Search")
     var user = await mdl.user.findAll({
      include: [{ model: mdl.user_role }],
      where: { name: search.name }
     })
    }
    else if (filter) {
     console.log("filter")
     if (filter.category == "student") {
      var user = await mdl.user.findAll({
       include: [{ model: mdl.user_role, where: { is_student: true } }],
      })
     } else if (filter.category == "librarian") {
      var user = await mdl.user.findAll({
       include: [{ model: mdl.user_role, where: { is_librarian: true } }],
      })
     } else if (filter.category == "faculty") {
      var user = await mdl.user.findAll({
       include: [{ model: mdl.user_role, where: { is_faculty: true } }],
      })
     } else {
      return res.status(404).send("Data Not Found");
     }

    }
    else if (sort) {
     console.log("sort")
     var user = await mdl.user.findAll({
      include: [{ model: mdl.user_role }],
      order: [["name", sort.name], ["createdAt", sort.registration_date]]
     })
    }
    else {
     console.log("All.....")
     var user = await mdl.user.findAll({
      include: [{ model: mdl.user_role, }]
     })
    }
   }
  }
  return res.status(200).send(user);
 } catch (error) {
  res.json({ error })
 }
}


// Book
async function search_book(req, res) {
 try {
  const { search, filter, sort } = req.body
  if (search && filter && sort) {
   console.log("Search filter sort")
   var book = await mdl.book.findAll({
    where: { title: search.name, subject: filter.subject },
    order: [["title", sort.name], ["copies_available", sort.copies_available]]
   })
  } else {
   if (search && filter) {
    console.log("search filter")
    var book = await mdl.book.findAll({
     where: { title: search.name, subject: filter.subject }
    })
   } else if (filter && sort) {
    console.log("filter sort")
    var book = await mdl.book.findAll({
     where: { subject: filter.subject },
     order: [["title", sort.name], ["copies_available", sort.copies_available]]
    })
   } else if (search && sort) {
    console.log("search sort")
    var book = await mdl.book.findAll({
     where: { title: search.name },
     order: [["title", sort.name], ["copies_available", sort.copies_available]]
    })
   } else {
    if (search) {
     console.log("Search")
     var book = await mdl.book.findAll({
      where: { title: search.name }
     })
    }
    else if (filter) {
     console.log("filter")
     var book = await mdl.book.findAll({
      where: { subject: filter.subject }
     })
    }
    else if (sort) {
     console.log("sort")
     console.log(sort.name)
     var book = await mdl.book.findAll({
      order: [["title", sort.name], ["copies_available", sort.copies_available]]
     })
    }
    else {
     console.log("All.....")
     var book = await mdl.book.findAll({})
     if (!book) {
      return res.status(404).send("Data Not Found");
     }
    }
   }
  }
  return res.status(200).send(book);
 } catch (error) {
  res.json({ error })
 }
}

// Records
async function all_records(req, res) {
 try {
  const record = await mdl.record.findAll({})
  if (record) {
   return res.status(200).send(record);
  }
  return res.status(404).send("Data Not Found");
 } catch (error) {
  res.json({ error })
 }
}

// Payments
async function all_payments(req, res) {
 try {
  const payment = await mdl.payment.findAll({
   include: [{ model: mdl.user }]
  })
  if (payment) {
   return res.status(200).send(payment);
  }
  return res.status(404).send("Data Not Found");
 } catch (error) {
  res.json({ error })
 }
}

module.exports.search_user = search_user;
module.exports.search_book = search_book;
module.exports.all_records = all_records;
module.exports.all_payments = all_payments;