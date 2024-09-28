'use strict';
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
      User.belongsTo(models.Persona,{foreignKey:'idPersona'});
      User.belongsTo(models.Role,{foreignKey:'idRole'})
    }
  }
  User.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    idPersona:{
      type: DataTypes.INTEGER,
      references:{
        model:'Persona',
        key:'id'
       }
    } ,
    idRole:{
      type:DataTypes.INTEGER,
      references:{
        model:'Role',
        key:'id'
      }
    } 
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};