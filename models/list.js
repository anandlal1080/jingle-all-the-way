module.exports = function (sequelize, DataTypes) {
  var List = sequelize.define("list", {
    // Giving the Gift model a name of type STRING
    name: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
  });

  List.associate = function (models) {
    models.list.belongsToMany(models.gift_table, {
      // foreignKey: {
      //   allowNull: false,
      // },
      through: "giftlist",
    });
  };

  return List;
};
