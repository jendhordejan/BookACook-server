const db = require("../db");
const Sequelize = require("sequelize");
const { User } = require("../user/model");

const Menu = db.define("menu", {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING(500),
    allowNull: true
  }
});

Menu.belongsTo(User);
User.hasMany(Menu);

module.exports = { Menu };
