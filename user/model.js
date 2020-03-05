  
const db = require("../db");
const Sequelize = require("sequelize");

const User = db.define("user", {
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  }
});


const UserProfile = db.define("user_profile", {
  name: {
    type: Sequelize.STRING
  },
  about: {
    type: Sequelize.STRING
  },
  imgUrl: {
    type: Sequelize.STRING
  }
})

UserProfile.belongsTo(User)

module.exports = {User, UserProfile};