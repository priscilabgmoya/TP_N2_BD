const { DataTypes } = require('sequelize');
const { sequelize } = require("../db/db.db");
const { region } = require('./region.model');
const { supermercado } = require('./supermecado.model');
const { articulo } = require('./articulo.model');
const { tipo_accion } = require('./tipoAccion.model');


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
// Una región tiene muchas ventas


// Un supermercado tiene muchas ventas
supermercado.hasMany(Venta, { foreignKey: 'id_supermercado' });
Venta.belongsTo(supermercado, { foreignKey: 'id_supermercado' });

// Un tipo de acción tiene muchas ventas
tipo_accion.hasMany(Venta, { foreignKey: 'id_tipo_accion' });
Venta.belongsTo(tipo_accion, { foreignKey: 'id_tipo_accion' });

// Un artículo tiene muchas ventas
articulo.hasMany(Venta, { foreignKey: 'id_articulo' });
Venta.belongsTo(articulo, { foreignKey: 'id_articulo' });

const addVenta = async (data, options = {}) => {

    try {
        const data_venta = await Venta.create(data, options );
        return { data: data_venta };
    } catch (error) {
        return { error: error };
    }
}
module.exports = addVenta;
