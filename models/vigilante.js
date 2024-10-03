'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Vigilante extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Vigilante.belongsTo(models.Persona, { foreignKey: 'idPersona', as: 'persona'});
    }
  }
  Vigilante.init({
    fechaTurno: DataTypes.DATE,
    idPersona: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Persona',
        key: 'id'
      }
    }

  }, {
    sequelize,
    modelName: 'Vigilante',
  });
  return Vigilante;
};