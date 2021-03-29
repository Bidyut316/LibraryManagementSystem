const Sequelize = require('sequelize')

// On local machin 

/*const sequelize = new Sequelize('NodeTest', 'postgres', '1234', {
 host: 'localhost',
 dialect: 'postgres'
});*/

// On Production for My Heroku App

const sequelize = new Sequelize('d27l4045edvaph', 'abeqmlzcyzsqcb', '35b3daf10e015ddb5ac6f32a22eb26056399c2c13249c4c0fea8aad91c5cc665', {
 host: 'ec2-54-196-33-23.compute-1.amazonaws.com',
 ssl: true,
 dialect: 'postgres',
 dialectOptions: {
  ssl: {
   require: true,
   rejectUnauthorized: false
  }
 }
});

module.exports.sequelize = sequelize;
