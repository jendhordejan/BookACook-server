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
  imageUrl: {
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
});

const UserAddress = db.define("user_address", {
  street: {
    type: Sequelize.STRING
  },
  city: {
    type: Sequelize.STRING
  },
  municipality: {
    type: Sequelize.STRING
  },
  province: {
    type: Sequelize.STRING
  },
  houseno: {
    type: Sequelize.STRING
  },
  postcode: {
    type: Sequelize.STRING
  },
  pnum: {
    type: Sequelize.STRING
  },
  pchar: {
    type: Sequelize.STRING
  },
  rd_x: {
    type: Sequelize.STRING
  },
  rd_y: {
    type: Sequelize.STRING
  },
  lat: {
    type: Sequelize.STRING
  },
  lon: {
    type: Sequelize.STRING
  }
});

UserProfile.belongsTo(User);
User.hasOne(UserProfile);

UserAddress.belongsTo(User);
User.hasOne(UserAddress);

module.exports = { User, UserProfile, UserAddress };
