import { Request, Response } from "express";
import Joi from "joi";
import multer from "multer";
import pgPromise from "pg-promise";

const db = pgPromise(/* options here */)(
  "postgres://postgres:corsojava@localhost:5432/Video"
);

const setupDb = async () => {
  await db.none(`DROP TABLE IF EXISTS planets;

  CREATE TABLE planets(
    id SERIAL NOT NULL PRIMARY KEY,
    name TEXT NOT NULL
  );
  `);
  await db.none(`INSERT INTO planets (name) VALUES ('Earth')`);
  await db.none(`INSERT INTO planets (name) VALUES ('Mars')`);

  const planets = await db.many(`SELECT * FROM planets;`);
  console.log(planets);
};
setupDb();
console.log(db);

const getAll = async (req: Request, res: Response) => {
  const planets = await db.many(`SELECT * FROM planets;`);

  res.status(200).json(planets);
};
const getOneById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const planet = await db.oneOrNone(
    `SELECT * FROM planets WHERE id=$1;`,
    Number(id)
  );
  res.status(200).json(planet);
};
const planetSchema = Joi.object({
  name: Joi.string().required(),
});
const create = async (req: Request, res: Response) => {
  const { name } = req.body;
  const newPlanet = { name };
  const validatedPlanet = planetSchema.validate(newPlanet);
  if (validatedPlanet.error) {
    return res.status(400).json({ msg: validatedPlanet.error });
  } else {
    await db.none(`INSERT INTO planets (name) VALUES ($1)`, name);
    res.status(201).json({ msg: "The planet has been added" });
  }
};
const updateById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;
  await db.none(`UPDATE planets SET name=$2 WHERE id=$1`, [id, name]);
  res.status(200).json({ msg: "Planet has been updated" });
};
const deleteById = async (req: Request, res: Response) => {
  const { id } = req.params;
  await db.none(`DELETE FROM planets WHERE id=$1`, Number(id));
  res.status(200).json({ msg: "Planet deleted" });
};
const createImage = async () => (req: Request, res: Response) => {
  console.log(req.file);
  res.status(201).json({ msg: "Planet img uploaded" });
};

export { getAll, getOneById, create, updateById, deleteById, createImage };
