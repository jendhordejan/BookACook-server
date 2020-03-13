const { Router } = require("express");
const router = new Router();
// const https = require("https");

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

//userprofile, useraddress will be populated automatically in the frontend
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

router.post("/user/login", async (request, response, next) => {
  try {
    const { email, password } = request.body;

    if (!email || !password) {
      response.json({
        status: 400,
        message: "Missing email or password"
      });
      return;
    }

    //check user credential via email
    const user = await User.findOne({ where: { email: email } });

    //check user credential via password
    const passwordValid = bcrypt.compareSync(
      password,
      user.dataValues.password
    );

    if (passwordValid) {
      const token = toJWT({ id: user.dataValues.id });
      const { id, email } = user.dataValues;

      response.json({
        status: 200,
        message: "Login Successful",
        user: { id, email, token }
      });
      return;
    } else {
      console.log({
        status: 400,
        message: "Invalid login credential"
      });
      response.json({
        status: 400,
        message: "Invalid login credential"
      });
      return;
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
