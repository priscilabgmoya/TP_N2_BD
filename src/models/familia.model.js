const { DataTypes } = require('sequelize');
const { sequelize } = require("../db/db.db");

const Familia = sequelize.define('familia', {
    id_familia: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    id_gfamilia: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },{ freezeTableName: true });

  Familia.associate = (models) => {
    Familia.belongsTo(models.G_Familia, {
      foreignKey: 'id_gfamilia',
      as: 'gFamilia',
    });
  };
  const addFamilia = async (data, options = {}) => {
    const { nombre , id_gfamilia} = data;
    try {
        const sectorEnc = await Familia.findOne({
            where: { nombre: nombre }
        }, options)
        if (sectorEnc) {
            return { data: sectorEnc };
        }
        const data = await Familia.create({ nombre,id_gfamilia }, options);
        return { data: data };
    } catch (error) {
        return { error: error };
    }
}
module.exports = addFamilia;