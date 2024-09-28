'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Persona extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Persona.hasMany(models.Vigilante,{foreignKey:'idPersona'});
      Persona.hasMany(models.Estudiante,{foreignKey:'idPersona'});
      Persona.hasOne(models.User,{foreignKey:'idPersona', as: 'usuario'})
    }
  }
  Persona.init({
    documento: DataTypes.STRING,
    nombres: DataTypes.STRING,
    apellidos: DataTypes.STRING,
    sexo: DataTypes.STRING,
    telefono: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Persona',
  });
  return Persona;
};