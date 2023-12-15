function GetRandomUserID() {
  const randomID = global.crypto.randomUUID();
  return randomID;
}

console.log(GetRandomUserID());
