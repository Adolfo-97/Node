import express from "express";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use((req, res, next) => {
  console.log(`Received ${req.method} request at ${req.url}`);
  next();
});

app.get("/", (req, res) => {
  res.status(200).json({ msg: "hello world" });
});

app.get("/planets", (req, res) => {
  res.status(200).json(planets);
});

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});
type Planet = {
  id: number;
  name: string;
};

type Planets = Planet[];

let planets: Planets = [
  {
    id: 1,
    name: "Earth",
  },
  {
    id: 2,
    name: "Mars",
  },
];
