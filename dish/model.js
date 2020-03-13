const db = require("../db");
const Sequelize = require("sequelize");

const { Menu } = require("../menu/model");

const Dish = db.define("dish", {
  image: {
    type: Sequelize.STRING
  },
  category: {
    type: Sequelize.STRING,
    allowNull: false
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING(500),
    allowNull: true
  },
  price: {
    type: Sequelize.INTEGER
  }
});

Dish.belongsTo(Menu);
Menu.hasMany(Dish);

module.exports = { Dish };
