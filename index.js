const { app } = require("./serverDist/server.js");
const sequelize = require("./db/db.js");
const { Sequelize, Model, DataTypes } = require('sequelize-typescript');

const port = process.env.PORT || 5000;
const isDev = process.env.NODE_ENV === "development";

try {
    sequelize.authenticate().then(() => {
        sequelize.sync({force:true}).then(() => {
            console.log("synced");
        })}).catch(e => console.log('Unable to connect to the database:', e));
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

app.listen(port, () => {
    console.log("Application is started on localhost:", port);
});
