const { DataTypes } = require('sequelize');
const { sequelize } = require("../db/db.db");
const { seccion } = require('./seccion.model');

const GFamilia = sequelize.define('g_familia', {
    id_gfamilia: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    id_seccion: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },{ freezeTableName: true });

seccion.hasMany(GFamilia, { foreignKey: 'id_seccion' });
GFamilia.belongsTo(seccion, { foreignKey: 'id_seccion' });

  const addGrupoFamilia = async (data, options = {}) => {
    const { nombre , id_seccion} = data;
    try {
        const sectorEnc = await GFamilia.findOne({
            where: { nombre: nombre }
        }, options)
        if (sectorEnc) {
            return { data: sectorEnc };
        }
        const data = await GFamilia.create({ nombre,id_seccion }, options);
        return { data: data };
    } catch (error) {
        return { error: error };
    }
}
module.exports = {
  addGrupoFamilia: addGrupoFamilia,
  grupoFamiliar: GFamilia
};