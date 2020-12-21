module.exports = function (sequelize, DataTypes) {
  var Gift = sequelize.define("Gift", {
    // Giving the Gift model a name of type STRING

    name: DataTypes.STRING,
    url: DataTypes.TEXT,
    listing_url: DataTypes.TEXT,
    price: DataTypes.STRING,
  });

  Gift.associate = function (models) {
    models.Gift.belongsToMany(models.List, {
      through: "giftlist",
    });
  };

  return Gift;
};
