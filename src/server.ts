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
app.get("/planets/:id", (req, res) => {
  const { id } = req.params;
  const planet = planets.find((p) => p.id === Number(id));
  res.status(200).json(planet);
});
app.post("/planets/", (req, res) => {
  const { id, name } = req.body;
  const stringa = req.body;
  console.log(`ho ricevuto la request: ${req}`);
  console.log(`ho ricevuto il body: ${stringa}`);
  const newPlanet = { id, name };

  planets = [...planets, newPlanet];
  res.status(201).json({ msg: "the planets has been added" });
});

app.put("/planets/:id", (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  planets = planets.map((p) => (p.id === Number(id) ? { ...p, name } : p));
  res.status(200).json({ msg: "Planet has been updated" });
});

app.delete("/planets/:id", (req, res) => {
  const { id } = req.params;
  planets = planets.filter((p) => p.id !== Number(id));
  res.status(200).json({ msg: "Planet deleted" });
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
