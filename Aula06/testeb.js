const bcrypt = require('bcrypt');

const before = new Date();
const result = bcrypt.hashSync("1234", 10);
console.log(result);
const after = new Date();

console.log("TEMPO")
console.log(after.getTime() - before.getTime())

const verificando = bcrypt.compareSync("1234", result);
console.log({ verificando })

