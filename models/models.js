const Sequelize = require('sequelize')
const seq = require('./../db/db')

// User model

const user = seq.sequelize.define('users', {
 id: {
  type: Sequelize.INTEGER,
  allowNull: false,
  primaryKey: true,
  autoIncrement: true
 },
 name: {
  type: Sequelize.STRING,
  allowNull: false,
 },
 email: {
  type: Sequelize.STRING,
  allowNull: false,
  unique: true
 },
 password: {
  type: Sequelize.STRING,
  allowNull: false,
 }
},
 {
  freezeTableName: true
 }
);

// for user role Model

const user_role = seq.sequelize.define('user_roles', {
 id: {
  type: Sequelize.INTEGER,
  allowNull: false,
  primaryKey: true,
  autoIncrement: true
 },
 userid: {
  type: Sequelize.INTEGER,
  allowNull: false,
  references: {
   model: 'users',
   key: 'id'
  },
  onUpdate: "cascade",
  onDelete: "cascade"
 },
 is_librarian: {
  type: Sequelize.BOOLEAN,
  defaultValue: false
 },
 is_student: {
  type: Sequelize.BOOLEAN,
  defaultValue: false
 },
 is_faculty: {
  type: Sequelize.BOOLEAN,
  defaultValue: false
 }

},
 {
  freezeTableName: true
 }
);

// Book Model
const book = seq.sequelize.define('books', {
 id: {
  type: Sequelize.INTEGER,
  allowNull: false,
  primaryKey: true,
  autoIncrement: true
 },
 isbn: {
  type: Sequelize.STRING,
  allowNull: false,
  unique: true
 },
 title: {
  type: Sequelize.STRING,
  allowNull: false
 },
 subject: {
  type: Sequelize.STRING,
  allowNull: false
 },
 description: {
  type: Sequelize.STRING,
  allowNull: true
 },
 copies_available: {
  type: Sequelize.INTEGER,
  defaultValue: 1
 },
 publish_date: {
  type: Sequelize.DATE,
  allowNull: true
 },
 pages: {
  type: Sequelize.INTEGER,
  allowNull: true
 }
},
 {
  freezeTableName: true
 }
);

// Model for Record

const record = seq.sequelize.define('records', {
 id: {
  type: Sequelize.INTEGER,
  allowNull: false,
  primaryKey: true,
  autoIncrement: true
 },
 userid: {
  type: Sequelize.INTEGER,
  allowNull: false,
  references: {
   model: 'users',
   key: 'id'
  },
  onUpdate: "cascade",
  onDelete: "cascade"
 },
 bookid: {
  type: Sequelize.INTEGER,
  allowNull: false,
  references: {
   model: 'books',
   key: 'id'
  },
  onUpdate: "cascade",
  onDelete: "cascade"
 },
 issue_date: {
  type: Sequelize.DATE,
  defaultValue: Sequelize.NOW
 },
 return_date: {
  type: Sequelize.DATE,
  defaultValue: Sequelize.NOW
 },
 return_status: {
  type: Sequelize.BOOLEAN,
  defaultValue: false
 }
},
 {
  freezeTableName: true
 }
);

// Model for Payment
const payment = seq.sequelize.define('payments', {
 id: {
  type: Sequelize.INTEGER,
  allowNull: false,
  primaryKey: true,
  autoIncrement: true
 },
 userid: {
  type: Sequelize.INTEGER,
  allowNull: false,
  references: {
   model: 'users',
   key: 'id'
  },
  onUpdate: "cascade",
  onDelete: "cascade"
 },
 date: {
  type: Sequelize.DATE,
  defaultValue: Sequelize.NOW
 },
 amount: {
  type: Sequelize.INTEGER,
  allowNull: false,
 }
});

// Create table and relationship
seq.sequelize
 .authenticate()
 .then(() => {
  user.sync()
  user_role.sync()
  book.sync()
  record.sync()
  payment.sync()
  user.hasOne(user_role, { foreignKey: 'userid' });
  user_role.belongsTo(user, { foreignKey: 'userid' });

  user.hasMany(record, { foreignKey: 'userid' });
  record.belongsTo(user, { foreignKey: 'userid' });
  book.hasMany(record, { foreignKey: 'bookid' });
  record.belongsTo(book, { foreignKey: 'bookid' });

  user.hasMany(payment, { foreignKey: 'userid' });
  payment.belongsTo(user, { foreignKey: 'userid' });

  console.log('Connection has been established successfully.');
 })
 .catch(err => {
  console.error('Unable to connect to the database:', err);
 });

module.exports.user = user;
module.exports.user_role = user_role;
module.exports.book = book;
module.exports.record = record;
module.exports.payment = payment;


