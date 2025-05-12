const { DataTypes } = require('sequelize');
const { sequelize } = require("../db/db.db");

const Supermercado = sequelize.define('supermercados', {
    id_supermercado: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    codigo: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    id_region: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
  }, {
    freezeTableName: true,
    timestamps: false
  });
  Supermercado.associate = (models) => {
    Supermercado.belongsTo(models.Seccion, {
      foreignKey: 'id_region',
      as: 'region',
    });
  };
  const addSupermercado = async (data, options = {}) => {
    const { nombre, codigo, id_region } = data;
    try {
        const sectorEnc = await Supermercado.findOne({
            where: { nombre: nombre , codigo: codigo}
        }, options)
        if (sectorEnc) {
            return { data: sectorEnc };
        }
        const data = await Supermercado.create({ nombre, codigo, id_region }, options);
        return { data: data };
    } catch (error) {
        return { error: error };
    }
}
module.exports = addSupermercado;