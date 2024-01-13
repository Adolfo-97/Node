import express from "express";
import dotenv from "dotenv";
import {
  getAll,
  getOneById,
  create,
  updateById,
  deleteById,
} from "./controllers/planets.js";
dotenv.config();
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

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});
