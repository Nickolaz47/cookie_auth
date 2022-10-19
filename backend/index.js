import express from "express";
import sequelize from "./db/conn.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
// Models
import User from "./models/User.js";
// Routes
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: "Hello API!" });
});

app.use("/", userRoutes);

sequelize
  .sync()
  .then(() => {
    console.log("Connected to SQLite3!");
    app.listen(port, () => {
      console.log("🚀 App listening on port " + port);
    });
  })
  .catch((err) => console.log(err));
