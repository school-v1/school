const config = require('../config/config.json');
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(config.development);

const ParentModel = require("./parent")(sequelize, DataTypes);
const Student_Incription = require('./student_Incription')(sequelize, DataTypes);

const db = {};

db.Parent = ParentModel;
db.Student_Incription = Student_Incription;

sequelize.sync()
  .then(() => {
    console.log('Database synced.');
  })
  .catch(error => {
    console.error('Error syncing database:', error);
  });

module.exports = db;
