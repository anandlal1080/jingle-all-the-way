// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");
const axios = require("axios");

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
  app.get("/logout", function (req, res) {
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
        const listItems = await userInstance.getLists();
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
    console.log(req.body.name.listName);
    console.log(req.body.userId);

    db.List.create({
      name: req.body.name.listName,
    })
      .then(async function () {
        const newList = await db.List.findOne({
          where: {
            name: req.body.name.listName,
          },
        });
        const userInstance = await db.User.findOne({
          where: {
            id: req.body.userId,
          },
        });
        await userInstance.addList([newList]);
      })
      .then(function () {
        res.render("members");
      });
  });

  // tester code to be deleted ===================================
  app.get("/api/etsy", async function (req, res) {
    axios
      .get(
        `https://openapi.etsy.com/v2/listings/active/?api_key=${process.env.ETSY_KEY}&includes=Images`
      )
      .then(function ({data}) {
        let etsy = [];
        for (let i = 0; i < data.length; i++) {
          item = {
            title: data[i].title,
            image: data[i].Images[0].url_170x135,
            desc: data[i].description,
          };
          etsy.push(item);
          
        }
        // console.log(etsy);

        res.json(etsy);
      });
  });
  // =============================================================
};
