'use strict';
const bcrypt = require("bcrypt");

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter your first name.'
        }
      }
    },
    last_name: DataTypes.STRING,
    address: DataTypes.STRING,
    post_code: DataTypes.STRING,
    contact: DataTypes.STRING,
    email: { 
      type:DataTypes.STRING,
      validate:{
        isEmail: true,
      },
      unique: {
          args:true,
          msg: 'Email already existed.'
      }
    },
    username: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [5, 50],
          msg: "username must be at least 5 characters"
        },
      },
      unique: {
          args:true,
          msg: 'Username already in use!'
      }
    },
    password: {
      type:DataTypes.STRING,
      validate: {
        len: {
          args: [5, 100],
          msg: "password must be at least 5 characters"
        },
      }}
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate((user, option) => {
    if (user.isNewRecord) {
      const salt = bcrypt.genSaltSync();
      const hash = bcrypt.hashSync(user.getDataValue('password'), salt);
      user.setDataValue('password', hash); 
    }
  });

   return User;
};