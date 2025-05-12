const { Sequelize } = require('sequelize');
require('dotenv').config(); 
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: "mariadb",
    logging: (msg) => {
        // Solo mostrar logs de transacciones y comandos clave
        if (
          msg.includes('BEGIN') ||
          msg.includes('COMMIT') ||
          msg.includes('ROLLBACK') ||
          msg.toUpperCase().startsWith('INSERT') ||
          msg.toUpperCase().startsWith('UPDATE') ||
          msg.toUpperCase().startsWith('DELETE')
        ) {
          console.log('🧾 SQL:', msg);
        }
      }
});

const conection_db = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync({ alter: true })
        console.log('Connection has been established successfully.');
        //await sequelize.sync({logging:false,force:false,alter:false});
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
module.exports = {
    connection: conection_db, 
    sequelize: sequelize
}