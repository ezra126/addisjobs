import express from "express";
import connectToDatabase from "./config/initializeDb.js";
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";
import employerRouter from "./routes/employer.route.js";
import postRouter from "./routes/post.route.js";
import cookieParser from "cookie-parser";

const app = express();

connectToDatabase();

app.use(express.json());

app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/employer", employerRouter);
app.use("/api/post", postRouter);

app.use(function (error, request, response, next) {
  const statusCode = error.statusCode || 500;
  const message = error.message || "Internal server error";
  response.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

app.set("port", process.env.PORT || 8888);
const server = app.listen(app.get("port"), () => {
  console.log(`Express running → On PORT : ${server.address().port}`);
});
