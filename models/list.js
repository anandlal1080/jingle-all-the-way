module.exports = function (sequelize, DataTypes) {
  var List = sequelize.define("List", {
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
