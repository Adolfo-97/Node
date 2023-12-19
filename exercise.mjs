import { writeFile } from "node:fs";
import { Buffer } from "node:buffer";

//Message to be saved
const message = new Uint8Array(Buffer.from("Ciao Node.js"));
writeFile("message.txt", message, "utf8", (err) => {
  if (err) throw err;
  console.log("The file has been saved!");
});
