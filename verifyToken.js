const jwt = require('jsonwebtoken')
const mdl = require('./models/models')

function auth(req, res, next) {

 const token = req.header('auth_token');
 if (!token) return res.status(401).send("Access Denied")
 try {
  const verified = jwt.verify(token, process.env.TOKEN_SECRET)
  req.user = verified;
  next()
 } catch (err) {
  res.status(400).send("Invalid Token");
 }
}

async function librarian_auth(req, res, next) {

 const token = req.header('auth_token');
 if (!token) return res.status(401).send("Access Denied")
 try {
  const verified = jwt.verify(token, process.env.TOKEN_SECRET)
  req.user = verified;
  console.log(req.user.id)
  const user = await mdl.user.findOne({
   include: [mdl.user_role],
   where: { id: req.user.id }
  })
  console.log(user.user_role.is_librarian)
  if (user.user_role.is_librarian) {
   next()
  }
  else {
   return res.status(401).send("Access Denied")
  }
 } catch (err) {
  res.status(400).send("Invalid Token");
 }
}


module.exports.auth = auth;
module.exports.librarian_auth = librarian_auth;

