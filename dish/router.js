const { Router } = require("express");
const router = new Router();

const { Dish } = require("./model");

//route to fetch entire menu records.
//test: http :5000/alldishes
router.get("/alldishes", async (request, response, next) => {
  try {
    const allDish = await Dish.findAll();

    let allDishes = [];
    allDish.map(dishItem => {
      allDishes = [...allDishes, dishItem.dataValues];
    });
    console.log("ALL DISH ===================", allDishes);
    response.json({
      message: "Fetched All Dishes",
      // menus: allMenuByUserId[0].dataValues
      allDishes
    });
    // response.json(allDishes);
  } catch (err) {
    next(err);
  }
});

//route for create a dish
router.post("/dish", async (request, response, next) => {
  try {
    console.log(request.body);

    const newDishResult = await Dish.create(request.body);

    response.json({
      message: "New Dish Created",
      dish: { ...newDishResult.dataValues }
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
