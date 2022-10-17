import express from "express";
import sequelize from "./db/conn.js";
// Models
import User from "./models/User.js";

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Hello API!" });
});

sequelize
  .sync()
  .then(() => {
    console.log("Conectado ao SQLite3!");
    app.listen(port, () => {
      console.log("🚀 App listening on port " + port);
    });
  })
  .catch((err) => console.log(err));
