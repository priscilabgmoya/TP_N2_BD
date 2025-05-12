const { DataTypes } = require('sequelize');
const { sequelize } = require("../db/db.db");
const { familia } = require('./familia.model');

const SubFamilia = sequelize.define('Sub_Familia', {
    id_subfamilia: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    id_familia: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },{ freezeTableName: true });

// Una familia tiene muchas subfamilias
familia.hasMany(SubFamilia, { foreignKey: 'id_familia' });
SubFamilia.belongsTo(familia, { foreignKey: 'id_familia' });

  const addSubFamilia = async (data, options = {}) => {
    const { nombre , id_familia} = data;
    try {
        const sectorEnc = await SubFamilia.findOne({
            where: { nombre: nombre }
        }, options)
        if (sectorEnc) {
            return { data: sectorEnc };
        }
        const data = await SubFamilia.create({ nombre,id_familia }, options);
        return { data: data };
    } catch (error) {
        return { error: error };
    }
}
module.exports = {
  addSubFamilia: addSubFamilia,
  sub_familia: SubFamilia
};