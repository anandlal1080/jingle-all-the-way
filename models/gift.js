module.exports = function (sequelize, DataTypes) {
<<<<<<< HEAD
  var Gift = sequelize.define("Gift", {
=======
  const Gift = sequelize.define("gift_table", {
>>>>>>> 9e9749dfdf92c87fb49738988151ce9c6e03e365
    // Giving the Gift model a name of type STRING

    name: DataTypes.STRING,
    url: DataTypes.TEXT,
  });

  Gift.associate = function (models) {
    models.Gift.belongsToMany(models.List, {
      through: "giftlist",
    });
  };

  return Gift;
};
