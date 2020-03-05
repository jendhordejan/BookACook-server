
const { Router } = require("express");
const router = new Router();

const {User, UserProfile} = require("./model");

const bcrypt = require("bcrypt");
const { toJWT } = require("../auth/jwt");

//for testing purposes
router.get("/user", (request, response, next) => {
  User.findAll()
    .then(users => response.json(users))
    .catch(error => next(error));
});


// http :5000/user/signup email=jend@outlook.com password=password
// Create a user
router.post("/user/signup", (request, response, next) => {
    console.log("===================:", request.body)
    const { email, password } = request.body.userData;
    const { imageUrl, firstName, lastName, houseNo, postCode, about } = request.body.userProfileData
    // create user account and auto-create userprofile record
    User.create({
      email: email,
      password: bcrypt.hashSync(password, 10)
    })
      .then(user =>{
        UserProfile.create({
          imgUrl: imageUrl,
          firstName: firstName,
          lastName: lastName,
          houseNo: houseNo,
          postCode, postCode,
          about: about,
          userId: user.id
        })
      })
      .then(userprofile => response.send(userprofile))
      .catch(error => next(error));
  });

module.exports = router;