const sequelize = require(`./sequelizeConnect`)


module.exports.sequelize = sequelize;

module.exports.connect = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');

    } catch (error) {
        console.error('Unable to connectors to the database:', error);
    }
    //await sequelize.sync();
}

module.exports.sync = async ()=> await sequelize.sync();






