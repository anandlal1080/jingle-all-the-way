module.exports = function (sequelize, DataTypes) {
  var Etsy = sequelize.define("Etsy", {
    // Giving the Etsy model a name of type STRING

    title: DataTypes.STRING,
    image: DataTypes.TEXT,
  });

  Etsy.associate = function (models) {
    models.Etsy.belongsToMany(models.Gift, {
      through: "etsygifts",
    });
  };

  return Etsy;
};
