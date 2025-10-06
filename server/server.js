require("dotenv").config();
const chalk = require("chalk");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const routes = require("./routes");

const app = express();
const port = process.env.PORT || 8888;

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use(routes);

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(port, () => console.log(chalk.bgCyan(`Server started on ${port}`)));
    })
    .catch((err) => {
        app.listen(port, () =>
            console.log(chalk.bgRed(`Server started on ${port}`))
        );
    });
