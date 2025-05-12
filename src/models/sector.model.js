const { DataTypes } = require('sequelize');
const {sequelize} = require("../db/db.db");

const Sector = sequelize.define('sectores', {
    id_sector: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  });
  const addSector = async (data, options = {}) => {
    const { nombre } = data;
    try {
        const sectorEnc = await Sector.findOne({
            where: { nombre: nombre }
        }, options)
        if (sectorEnc) {
            return { data: sectorEnc };
        }
        const data = await Sector.create({ nombre }, options);
        return { data: data };
    } catch (error) {
        return { error: error };
    }
}
module.exports = {
  addSector: addSector,
  sector: Sector
};