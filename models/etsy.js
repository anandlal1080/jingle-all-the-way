module.exports = function (sequelize, DataTypes) {
  var Etsy = sequelize.define("Etsy", {
    // Giving the Etsy model a name of type STRING

    title: DataTypes.STRING,
    image: DataTypes.TEXT,
  });

  return Etsy;
};
