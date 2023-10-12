import express from "express";
import connectToDatabase from "./config/initializeDb.js";

const app = express();
const port = 3000;

connectToDatabase();

app.listen(port, () => {
  console.log(`server is running at the ${port}`);
});
