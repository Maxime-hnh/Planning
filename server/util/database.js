const { Sequelize, DataTypes } = require('sequelize');


try {
    const sequelize = new Sequelize(
        process.env.PG_DB,
        process.env.PG_USER,
        process.env.PG_PASSWORD,
        {
            host: process.env.PG_HOST,
            port: process.env.PG_PORT,
            dialect: 'postgres',
        }
    );
    sequelize
        .authenticate()
        .then(() => {
            console.log('🚀🚀Connexion à la base de données établie avec succès.🚀🚀');
        })
        .catch((error) => {
            console.error('⛔⛔Erreur lors de la connexion à la base de données :', error);
        });
    module.exports = sequelize;
} catch (error) {
    console.error('⛔⛔Erreur lors de la création de l\'instance Sequelize :', error);
}