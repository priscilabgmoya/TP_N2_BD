const { DataTypes } = require('sequelize');
const { sequelize } = require("../db/db.db");

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

  GFamilia.associate = (models) => {
    GFamilia.belongsTo(models.Seccion, {
      foreignKey: 'id_seccion',
      as: 'seccion',
    });
  };
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
module.exports = addGrupoFamilia;