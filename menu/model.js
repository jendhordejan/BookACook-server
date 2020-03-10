const db = require("../db");
const Sequelize = require("sequelize");
const { User } = require("../user/model");

const Menu = db.define("menu", {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: true
  },
  price: {
    type: Sequelize.INTEGER
  }
});

const Dish = db.define("dish", {
  imageUrl: {
    type: Sequelize.STRING
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: true
  }
});

Menu.belongsTo(User);
User.hasMany(Menu);

Dish.belongsTo(Menu);
Menu.hasMany(Dish);

module.exports = { Menu };
