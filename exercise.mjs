function luckyDraw(player) {
  return new Promise((resolve, reject) => {
    const win = true; /* Boolean(Math.round(Math.random())) */

    process.nextTick(() => {
      if (win) {
        resolve(`${player} won a prize in the draw!`);
      } else {
        reject(new Error(`${player} lost the draw.`));
      }
    });
  });
}

luckyDraw("Joe")
  .then((result) => {
    console.log(result);
    return luckyDraw("Carolina");
  })
  .then((result) => {
    console.log(result);
    return luckyDraw("Sabrina");
  })
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.error(err);
  });
