const express = require("express")


const auth = require("./auth/middleware");

const app = express();
const port = process.env.PORT || 5000;

const userRouter = require("./user/router");
const authRouter = require("./auth/router");

app.use(authRouter);
app.use(express.json())
app.use(userRouter)

app.listen(port, () =>
  console.log(`BookACook Server started. Listening in port: ${port}`)
);