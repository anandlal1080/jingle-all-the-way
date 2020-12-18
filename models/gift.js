module.exports = function (sequelize, DataTypes) {
  const Gift = sequelize.define("gift_table", {
    // Giving the Gift model a name of type STRING
    list_id: DataTypes.INTEGER,
    gift_name: DataTypes.STRING,
    gift_url: DataTypes.TEXT,
  });

  Gift.associate = function (models) {
    models.gift_table.belongsToMany(models.list, {
      through: "giftlist",
    });
  };

  return Gift;
};
