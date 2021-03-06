// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");
const axios = require("axios");
const { Op } = require("sequelize");

module.exports = function (app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function (req, res) {
    res.json(req.user);
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function (req, res) {
    db.User.create({
      first_name: req.body.first,
      last_name: req.body.last,
      email: req.body.email,
      password: req.body.password,
    })
      .then(function () {
        res.redirect(307, "/api/login");
      })
      .catch(function (err) {
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get("/api/logout", function (req, res) {
    req.logout();
    res.render("index");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", async function (req, res) {
    // console.log(req.user);
    if (!req.user) {
      // The user is not logged in, send back an empty object

      return res.json({});
    } else {
      try {
        // return the result to the user with res.json
        const userInstance = await db.User.findOne({
          where: {
            Id: req.user.id,
          },
        });
        const listItems = await db.List.findAll({
          where: {
            UserId: req.user.id,
          },
        });
        // console.log(listItems);
        res.json({
          listItems,
          user: {
            first_name: userInstance.first_name,
            id: userInstance.id,
          },
        });
      } catch (err) {
        res.status(500).end();
      }
    }
  });

  // Tester code to be finalized =====================================
  app.post("/api/user_lists", async function (req, res) {
    const userListName = req.body.name.listName;
    // console.log(req.body.userId)
    db.List.create({
      name: userListName,
      UserId: req.body.userId,
    }).then(function () {
      res.render("members");
    });
  });

  // tester code to be deleted ===================================
  app.get("/api/etsy", async function (req, res) {
    await axios
      .get(
        `https://openapi.etsy.com/v2/listings/active/?api_key=${process.env.ETSY_KEY}&includes=Images(url_170x135):1&fields=url,title,price`
      )
      .then(async function ({ data }) {
        let etsy = [];

        for (let i = 0; i < data.results.length; i++) {
          const item = {
            title: data.results[i].title,
            image: data.results[i]?.Images[0].url_170x135,
            listing_url: data.results[i].url,
            price: data.results[i].price,
          };
          await db.Etsy.create(item);
          etsy.push(item);
        }

        res.json(etsy);
      });
  });

  app.post("/api/list_items", async function (req, res) {
    try {
      const listInstance = await db.List.findOne({
        where: {
          id: req.body.list,
        },
      });

      const allGifts = await listInstance.getGifts();
      const userGiftList = [];
      for (const giftItem of allGifts) {
        const giftToPush = {
          id: giftItem.id,
          name: giftItem.name,
          url: giftItem.url,
          listing_url: giftItem.listing_url,
          price: giftItem.price,
        };
        userGiftList.push(giftToPush);
      }

      // allGifts.forEach(function (giftItem, i, array) {
      //   const giftToPush = {
      //     id: giftItem.id,
      //     name: giftItem.name,
      //     url: giftItem.url,
      //     listing_url: giftItem.listing_url,
      //     price: giftItem.price,
      //   };
      //   userGiftList.push(giftToPush);
      // });

      // console.log("All Gifts", allGifts[0].name);
      // let giftsId = await db.List.findAll({
      //   where: {
      //     id: req.body.list,
      //   },
      //   include: [{ model: db.Gift }],
      //   through: "giftlist",
      //   raw: true,
      // });
      // for (let i = 0; i < giftsId.length; i++) {
      //   let gifts = {
      //     id: giftsId[i]["Gifts.id"],
      //     name: giftsId[i]["Gifts.name"],
      //     url: giftsId[i]["Gifts.url"],
      //     listing_url: giftsId[i]["Gifts.listing_url"],
      //     price: giftsId[i]["Gifts.price"],
      //   };
      //   userGiftList.push(gifts);
      // }
      res.json(userGiftList);
    } catch (error) {
      console.log(error);
      res.status(500).json({});
    }
  });

  app.post("/api/etsy_items", async function (req, res) {
    console.log(req.body);
    let etsyItem = await db.Etsy.findOne({
      where: {
        id: req.body.etsy,
      },
      raw: true,
    });

    let updateGiftList = await db.Gift.create({
      name: etsyItem.title,
      url: etsyItem.image,
      listing_url: etsyItem.listing_url,
      price: etsyItem.price,
    });
    let updateList = await db.List.findOne({
      where: {
        [Op.and]: [{ id: req.body.list }, { UserId: req.user.id }],
      },
    });
    await updateList.addGift(updateGiftList);

    res.json(updateGiftList);
  });
  // =============================================================
  // this route removes the user list selected from the memberspage
  // and returns the updated list
  app.post("/api/delete_list", async function (req, res) {
    let removeList = req.body.dlt_list;

    await db.List.destroy({
      where: {
        id: removeList,
      },
    });

    res.end();
  });

  app.post("/api/clear_etsy", async function (req, res) {
    await db.Etsy.destroy({
      where: {},
      truncate: true,
    });

    res.end();
  });

  app.post("/api/new_trash_icon", async function (req, res) {
    const { giftId, listId } = req.body;
    const giftInstance = await db.Gift.findOne({
      where: { id: giftId },
    });

    giftInstance.removeList(listId);
    res.sendStatus(200);

    // .catch((e) => console.log(e));
  });
};
