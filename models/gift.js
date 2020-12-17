module.exports = function (sequelize, DataTypes) {
  var Gift = sequelize.define("gift_table", {
    // Giving the Gift model a name of type STRING
    list_id: Sequelize.INTEGER,
    gift_name: Sequelize.STRING,
    gift_url: Sequalize.TEXT,
  });

  Gift.associate = function (models) {
    models.Gift.hasMany(models.List, {
      foreignKey: {
        allowNull: false,
      },
    });
  };

  return Gift;
};
