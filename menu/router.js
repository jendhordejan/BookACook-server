const { Router } = require("express");
const router = new Router();

const { Menu } = require("./model");
const { Dish } = require("../dish/model");

//route to fetch entire menu records.
//test: http :5000/allmenus
router.get("/menus", async (request, response, next) => {
  try {
    const allMenu = await Menu.findAll();
    response.json(allMenu);
  } catch (err) {
    next(err);
  }
});

//router to get all menus by userId
router.get("/menus/:id", async (request, response, next) => {
  try {
    console.log(
      "--------------------------------check params  :  ",
      request.params.id
    );
    const allMenuByUserId = await Menu.findAll({
      where: { userId: request.params.id },
      include: [{ model: Dish }]
    });
    // response.json(allMenuByUserId);
    console.log("allMenuByUserId:   ", allMenuByUserId);
    response.json({
      message: "Fetched All Menu for this user",
      menus: { ...allMenuByUserId }
    });
  } catch (err) {
    next(err);
  }
});

//route for create a menu
router.post("/menu", async (request, response, next) => {
  try {
    console.log(request.body);

    const newMenuResult = await Menu.create(request.body);

    response.json({
      message: "New Menu Created",
      menu: { ...newMenuResult.dataValues }
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
