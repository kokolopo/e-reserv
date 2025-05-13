import express from "express";
import bodyParser from "body-parser";
import router from "./src/routes/index.js";

const port = 3000;
const app = express();

app.use(express.json());
app.use(bodyParser.json());

app.use(router);

app.listen(port, () => console.log(`run and serve on port : ${port}`));
