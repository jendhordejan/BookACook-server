const { Router } = require("express");
const router = new Router();
const https = require("https");

const { User, UserProfile, UserAddress } = require("./model");

const bcrypt = require("bcrypt");
const { toJWT } = require("../auth/jwt");

//for testing purposes
router.get("/user", (request, response, next) => {
  User.findAll()
    .then(users => response.json(users))
    .catch(error => next(error));
});

// Upon user signup tables user.
router.post("/user/signup", async (request, response, next) => {
  try {
    const hasedPassword = bcrypt.hashSync(request.body.password, 10);
    const newRequest = { ...request.body, password: hasedPassword };
    const user = await User.create(newRequest);

    const { password, ...userInfo } = user.dataValues;
    response.json({
      message: "Sign up successful.",
      jwt: toJWT({ userId: user.id }),
      user: { ...userInfo }
    });
  } catch (err) {
    next(err);
  }

  //---end of post
});

//userprofile, useraddress will be populated automatically.
router.post("/userprofile/signup", async (request, response, next) => {
  try {
    console.log("/userprofile/signup request.body: ", request.body);

    const userProfileResult = await UserProfile.create(request.body);

    response.json({
      message: "User Profile Created",
      userProfile: { ...userProfileResult.dataValues }
    });
  } catch (err) {
    next(err);
  }
});

router.post("/useraddress/signup", async (request, response, next) => {
  try {
    console.log("/useraddress/signup request.body: ", request.body);

    const userAddressResult = await UserAddress.create(request.body);

    response.json({
      message: "User Address Created",
      userAddress: { ...userAddressResult.dataValues }
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;

// const {
//   street,
//   city,
//   municipality,
//   province,
//   postcode,
//   pnum,
//   pchar,
//   rd_x,
//   rd_y,
//   lat,
//   lon
// } = request.body.userAddress;

// // create user account and auto-create userprofile record
// User.create({
//   email: email,
//   password: bcrypt.hashSync(password, 10)
// })
//   .then(user => {
//     //construct return data of user.credentials [include user.personalInfo]**
//     //construct return data of user.address
//     const userResult = user.dataValues;
//     varUserId = userResult.id;
//     console.log("userResult", userResult);

//     UserProfile.create({
//       imgUrl: imageUrl,
//       firstName: firstName,
//       lastName: lastName,
//       houseNo: houseNo,
//       postCode,
//       postCode,
//       about: about,
//       userId: userResult.id
//     });
//   })
//   .then(userprofile => {
//     const userProfileResult = userprofile;
//     console.log("userProfileResult", userProfileResult);
//     UserAddress.create({
//       street: street,
//       city: city,
//       municipality: municipality,
//       province: province,
//       postcode: postcode,
//       pnum: pnum,
//       pchar: pchar,
//       rd_x: rd_x,
//       rd_y: rd_y,
//       lat: lat,
//       lon: lon,
//       userId: varUserId
//     });
//   })
//   .then(userAddress => {
//     const userAddressResult = userAddress;
//     console.log("userAddressResult", userAddressResult);
//     response.send(userResult);
//   })
//   .catch(error => next(error));
