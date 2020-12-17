module.exports = function (sequelize, DataTypes) {
  var Gift = sequelize.define("gift_table", {
    // Giving the Gift model a name of type STRING
    list_id: DataTypes.INTEGER,
    gift_name: DataTypes.STRING,
    gift_url: DataTypes.TEXT,
  });

  Gift.associate = function (models) {
    models.gift_table.belongsToMany(models.list, {
      // foreignKey: {
      //   allowNull: false,
      // },
      through: "giftlist",
    });
  };

  return Gift;
};

// Gft = sequlize.literal(`()`);
