module.exports = function (sequelize, DataTypes) {
  var Etsy = sequelize.define("Etsy", {
    // Giving the Etsy model a name of type STRING

    title: DataTypes.STRING,
    image: DataTypes.TEXT,
    listing_url: DataTypes.TEXT,
    price: DataTypes.STRING,
  });

  return Etsy;
};
