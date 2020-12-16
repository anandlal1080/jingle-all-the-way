// / Dependencies

// Sequelize (capital) references the standard library
var Sequelize = require("sequelize");
// sequelize (lowercase) references my connection to the DB.
var sequelize = require("  ");

// Creates a "Gift" model that matches up with DB
var Gift = sequelize.define("gift", {
  item: Sequelize.STRING,
  description: Sequelize.STRING,
  category: Sequelize.STRING,
  price: Sequelize.INTEGER,
  url: Sequalize.TEXT
});

// Syncs with DB
Gift.sync();

// Makes the Gift Model available for other files (will also create a table)
module.exports = Gift;