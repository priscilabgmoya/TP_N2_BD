// models/TipoAccion.js
const { DataTypes } = require('sequelize');
const { sequelize } = require("../db/db.db"); // Asegurate de tener tu conexión definida en config/db.js

const TipoAccion = sequelize.define('tipos_accion', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false
  }
}, {
  freezeTableName: true,
});

const addTipoAccion = async (data, options = {}) => {
    const { nombre } = data;
    try {
        const sectorEnc = await TipoAccion.findOne({
            where: { nombre: nombre }
        }, options )
        if (sectorEnc) {
            return { data: sectorEnc };
        }
        const data = await TipoAccion.create({ nombre }, options);
        return { data: data };
    } catch (error) {
        return { error: error };
    }
}
module.exports = {
  addTipoAccion:addTipoAccion,
  tipo_accion: TipoAccion
};
