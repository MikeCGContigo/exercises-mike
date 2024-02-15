import express from "express";
import indexRoute from "./routes/index.js";
import sequelize from "./models/config.js";
import dotenv from "dotenv";
import index from "./models/index.js"

dotenv.config();

const app = express();
app.use(express.json());
app.use(indexRoute);

sequelize.authenticate()
    .then(() => {
        sequelize.sync({ alter: true });
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

app.listen(process.env.EXPRESS_PORT, () => {
    console.log("listening at port:", process.env.EXPRESS_PORT);
});