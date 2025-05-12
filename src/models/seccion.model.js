const { DataTypes } = require('sequelize');
const { sequelize } = require("../db/db.db");
const { sector } = require('./sector.model');

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

// Un sector tiene muchas secciones
sector.hasMany(Seccion, { foreignKey: 'id_sector' });
Seccion.belongsTo(sector, { foreignKey: 'id_sector' });
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
module.exports = {
  addSeccion:addSeccion, 
seccion: Seccion
};