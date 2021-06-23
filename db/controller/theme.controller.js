const sequelize = require("../db")
const { Sequelize } = require("sequelize");
const { DataTypes } = require("sequelize");

class ThemeController {
    async themetest(req, res){
        console.log("testtest");
        // console.log(req);
        const {theme} = req.body;
        console.log(JSON.stringify(req.body));
        console.log(theme);
        const FCards = sequelize.define('themes', {
            // Model attributes are defined here
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            name: {
                type: Sequelize.STRING
            }
        }, {
            // Other model options go here
            timestamps: false,
            freezeTableName: true,
            tableName: 'themes',
        });
        // const test = await sequelize.query('SELECT NOW()')
        // console.log(JSON.stringify(test, null, 2), 'test');
        const fCards = await FCards.create({
            name: 'alice123',
        }, { fields: ['name'] });
        const users = await FCards.findAll();
        console.log(users.every(user => user)); // true
        console.log("All users:", JSON.stringify(users, null, 2));
// let's assume the default of isAdmin is false
        console.log(fCards.name); // 'alice123'
        res.json('ok')
    }
}

module.exports = new ThemeController();
