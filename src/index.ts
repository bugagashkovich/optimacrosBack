import * as express from "express";
import { connect, connection } from "mongoose";
import { autoRouter } from "./routes/auto";
import cors = require("cors");

const app = express();
const port = 4000;
app.use(cors());
app.use(express.json());
app.use("/", autoRouter);
app.use(
  (
    err,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    res.status(500).send(err.message);
  }
);

async function run() {
  try {
    await connect("mongodb://localhost:27017/optimacros");
    app.listen(port, () => console.log(`Running on port ${port}`));
    console.log("Server is ready");
  } catch (error) {
    console.log(error);
  }
}

run().catch((err) => console.log(err));

process.on("exit", function () {
  console.log("Спасибо за использование! Досвидания!");
  connection.close();
});
