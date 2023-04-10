'use strict';

//use all the models, in this case theres only one

const { Sequelize } = require('sequelize');
const SQL_URL = process.env.SQL_URL || 'sqlite:memory:';

const createUser = require('./users.model');

const sequelize = new Sequelize(SQL_URL);
const UserModel = createUser(sequelize);

// create our associations / relationships (from sequelize model method)
//ClothesModel.hasMany(FoodModel, {foreignKey: 'clothesId', sourceKey: 'id'});
//FoodModel.belongsTo(ClothesModel, { foreignKey: 'clothesId', targetKey: 'id'});

module.exports = {
  sequelize,
  User: UserModel,
};
