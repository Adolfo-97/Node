import express from "express";
import dotenv from "dotenv";
import {
  getAll,
  getOneById,
  create,
  updateById,
  deleteById,
  createImage,
} from "./controllers/planets.js";
import { logIn, signUp, logOut } from "./controllers/users.js";
import multer from "multer";
import authorize from "./authorize.js";
import "./passwport.js";
dotenv.config();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use((req, res, next) => {
  console.log(`Received ${req.method} request at ${req.url}`);
  next();
});

app.get("/planets", getAll);
app.get("/planets/:id", getOneById);
app.post("/planets/", create);
app.put("/planets/:id", updateById);
app.delete("/planets/:id", deleteById);

app.post("/planets/:id/image", upload.single("image"), createImage);

app.post("/users/login", logIn);
app.post("/users/signup", signUp);
app.get("/users/logout", authorize, logOut);
app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});
