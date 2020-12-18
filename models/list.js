module.exports = function (sequelize, DataTypes) {
<<<<<<< HEAD
  var List = sequelize.define("List", {
=======
  const List = sequelize.define("list", {
>>>>>>> 9e9749dfdf92c87fb49738988151ce9c6e03e365
    // Giving the Gift model a name of type STRING
    name: DataTypes.STRING,
  });

  List.associate = function (models) {
    models.List.belongsToMany(models.Gift, {
      through: "giftlist",
    });
    models.List.belongsTo(models.User);
  };

  return List;
};
