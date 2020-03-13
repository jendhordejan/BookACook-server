const { Router } = require("express");
const router = new Router();

const { Menu } = require("./model");

//route to fetch entire menu records.
//test: http :5000/allmenus
router.get("/allmenus", async (request, response, next) => {
  try {
    const allMenu = await Menu.findAll();
    response.json(allMenu);
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
