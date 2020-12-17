var bcrypt = require("bcryptjs");

var pass = bcrypt.hashSync("qwertyuio1234567", bcrypt.genSaltSync(10), null);
console.log(pass);

console.log(bcrypt.compareSync("qwertyuio123456789", pass));
