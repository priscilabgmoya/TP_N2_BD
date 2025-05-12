const { DataTypes } = require('sequelize');
const { sequelize } = require("../db/db.db");

const Region = sequelize.define('region', {
    id_region: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    descripcion: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    
},{ freezeTableName: true });



const addRegion = async (data, options = {}) => {
    const { descripcion } = data;
    try {
        const regionEnc = await Region.findOne({
            where: { descripcion: descripcion }
        }, options)
        if (regionEnc) {
            return { data: regionEnc };
        }
        const data = await Region.create({ descripcion }, options);
        return { data: data };
    } catch (error) {
        return { error: error };
    }
}
module.exports = {
    addRegion: addRegion, 
    region: Region
};