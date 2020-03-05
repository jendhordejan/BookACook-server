const express = require("express")
const cors = require("cors")


const auth = require("./auth/middleware");
const corsMiddleware = cors()

const app = express();
const port = process.env.PORT || 5000;

const userRouter = require("./user/router");
const authRouter = require("./auth/router");

app.use(corsMiddleware)
app.use(authRouter);
app.use(express.json())
app.use(userRouter)

app.listen(port, () =>
  console.log(`BookACook Server started. Listening in port: ${port}`)
);