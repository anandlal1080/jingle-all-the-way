const db = require("../models");
const bcrypt = require("bcryptjs");

var pass = bcrypt.hashSync("12345", bcrypt.genSaltSync(10), null);
(async () => {
  await db.sequelize.sync({ force: true });

  // seeding the database
  const users = [
    {
      first_name: "John",
      last_name: "Smith",
      email: "john@gmail.com",
      password: pass,
    },
  ];
  await db.User.bulkCreate(users);

  const list = [
    {
      name: "Red",
    },
    {
      name: "Green",
    },
  ];
  await db.List.bulkCreate(list);

  // array of gifts
  const gifts = [
    {
      name: "Xbox",
      url: "Xbox_url",
    },
    {
      name: "PS5",
      url: "PS5_url",
    },
    {
      name: "Switch",
      url: "Switch_url",
    },
  ];
  await db.Gift.bulkCreate(gifts);

  const xboxInstance = await db.Gift.findOne({
    where: {
      name: "Xbox",
    },
  });
  const ps5Instance = await db.Gift.findOne({
    where: {
      name: "PS5",
    },
  });
  const switchInstance = await db.Gift.findOne({
    where: {
      name: "Switch",
    },
  });
  const userInstance = await db.User.findOne({
    where: {
      email: "john@gmail.com",
    },
  });
  const redList = await db.List.findOne({
    where: {
      name: "Red",
    },
  });
  const greenList = await db.List.findOne({
    where: {
      name: "Green",
    },
  });
  await userInstance.addLists([redList, greenList]);
  //   await redList.setUser(userInstance);
  //   await greenList.setUser(userInstance);

  await redList.addGifts([xboxInstance, ps5Instance]);
  await greenList.addGifts([ps5Instance, switchInstance]);

  console.log("Data seeded successfully!");
  process.exit(0);
})();
