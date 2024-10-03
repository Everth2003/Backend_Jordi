'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Estudiante extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Estudiante.belongsTo(models.Persona,{foreignKey:'idPersona', as: 'persona'})
    }
  }
  Estudiante.init({
    carrera: DataTypes.STRING,
    idPersona:{
      type:   DataTypes.INTEGER,
      references:{
        model: 'Persona',
        key:'id'
      }
    }
   
  }, {
    sequelize,
    modelName: 'Estudiante',
  });
  return Estudiante;
};