'use strict';

require('dotenv').config();
const {DataTypes} = require('sequelize');



const Users = (sequelize) => sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Users;