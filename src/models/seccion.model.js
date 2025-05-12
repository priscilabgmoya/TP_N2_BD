const { DataTypes } = require('sequelize');
const { sequelize } = require("../db/db.db");

const Seccion = sequelize.define('seccion', {
    id_seccion: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    id_sector: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  } ,{ freezeTableName: true });

  Seccion.associate = (models) => {
    Seccion.belongsTo(models.Sector, {
      foreignKey: 'id_sector',
      as: 'sector',
    });
  };

  const addSeccion = async (data, options = {}) => {
    const { nombre , id_sector} = data;
    try {
        const sectorEnc = await Seccion.findOne({
            where: { nombre: nombre }
        }, options)
        if (sectorEnc) {
            return { data: sectorEnc };
        }
        const data = await Seccion.create({ nombre,id_sector }, options);
        return { data: data };
    } catch (error) {
        return { error: error };
    }
}
module.exports = addSeccion;