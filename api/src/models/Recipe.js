const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    id:{
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    summary: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    score: {
      type: DataTypes.STRING,
    },
    healthScore: {
      type: DataTypes.STRING,
    },
    instructions: {
      type: DataTypes.TEXT,
    },
    source:{
    type: DataTypes.VIRTUAL,
    get(){
      return "base de datos food"
    }
    }   
  },
  {timestamps: false});
};

