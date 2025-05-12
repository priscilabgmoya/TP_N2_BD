const { DataTypes } = require('sequelize');
const { sequelize } = require("../db/db.db");
const { sub_familia } = require('./sub_familia.model');

const Articulo = sequelize.define('articulo', {
    id_articulo: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    codigo_barra: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    nombre: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    id_subfamilia: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },{ freezeTableName: true });

// Una sub_familia tiene muchos artículos
sub_familia.hasMany(Articulo, { foreignKey: 'id_subfamilia' });
Articulo.belongsTo(sub_familia, { foreignKey: 'id_subfamilia' });


  const addArticulo = async (data, options = {}) => {
    const { nombre , codigo_barra, id_subfamilia} = data;
    try {
        const artEnc = await Articulo.findOne({
            where: { nombre: nombre , codigo_barra: codigo_barra}
        }, options)
        if (artEnc) {
            return { data: artEnc };
        }
        const data = await Articulo.create({ nombre,codigo_barra,id_subfamilia }, options);
        return { data: data };
    } catch (error) {
        return { error: error };
    }
}
module.exports = {
  addArticulo: addArticulo,
  articulo: Articulo
};
