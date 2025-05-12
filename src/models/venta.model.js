const { DataTypes } = require('sequelize');
const { sequelize } = require("../db/db.db");


const Venta = sequelize.define('Venta', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  fecha_carga: {
    type: DataTypes.DATE,
    allowNull: false
  },
  desde: {
    type: DataTypes.DATE,
    allowNull: false
  },
  hasta: {
    type: DataTypes.DATE,
    allowNull: false
  },
  id_region: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  id_supermercado: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  id_tipo_accion: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  id_articulo: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  monto: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  }
}, {
  tableName: 'ventas',
  timestamps: false
});

// Relaciones (asociaciones)
Venta.associate = (models) => {
  Venta.belongsTo(models.region, {
    foreignKey: 'id_region',
    as: 'region'
  });

  Venta.belongsTo(models.supermercados, {
    foreignKey: 'id_supermercado',
    as: 'supermercados'
  });

  Venta.belongsTo(models.tipo_accion, {
    foreignKey: 'id_tipo_accion',
    as: 'tipos_accion'
  });

  Venta.belongsTo(models.articulo, {
    foreignKey: 'id_articulo',
    as: 'articulo'
  });
};

const addVenta = async (data, options = {}) => {

    try {
        const data_venta = await Venta.create(data, options );
        return { data: data_venta };
    } catch (error) {
        return { error: error };
    }
}
module.exports = addVenta;
