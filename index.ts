require("dotenv").config();
import { AppDataSource } from "./config/db";
const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
const apiRoutes = require("./routes/index");
const PORT = process.env.PORT ? process.env.PORT : 3000;

app.listen(PORT, () => {
    console.log(`Server has started at port ${PORT}`);
});

app.use("/api/v1", apiRoutes());

AppDataSource.initialize()
    .then(async () => {
        console.log("connected to DB ");
    })
    .catch((error) => console.error(error));
