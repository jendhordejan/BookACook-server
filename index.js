const express = require("express");
const cors = require("cors");
const auth = require("./auth/middleware");

const corsMiddleware = cors();

const app = express();
const port = process.env.PORT || 5000;

const authRouter = require("./auth/router");
const userRouter = require("./user/router");
const menuRouter = require("./menu/router");
const dishRouter = require("./dish/router");

app.use(corsMiddleware, express.json());

app.use(authRouter);
app.use(userRouter);
app.use(menuRouter);
app.use(dishRouter);

app.listen(port, () =>
  console.log(`BookACook Server started. Listening in port: ${port}`)
);
