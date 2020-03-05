  
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
  imgUrl: {
    type: Sequelize.STRING
  },
  firstName: {
    type: Sequelize.STRING
  },
  lastName: {
    type: Sequelize.STRING
  },
  houseNo: {
    type: Sequelize.STRING
  },
  postCode: {
    type: Sequelize.STRING
  },
  about: {
    type: Sequelize.STRING
  }
})

UserProfile.belongsTo(User)

module.exports = {User, UserProfile};