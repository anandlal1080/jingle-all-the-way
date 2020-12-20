// Requiring path to so we can use relative routes to our HTML files
const path = require("path");
const db = require("../models");
const axios = require("axios");
// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function (app) {
  app.get("/", async function (req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      var data = await db.Gift.findAll({
        where: {
          id: req.user.id,
        },
        raw: true,
      });
      var hbsObject = { gifts: data, names: req.user.first_name };
      res.render("members", hbsObject);
    }
    // res.sendFile(path.join(__dirname, "../public/index.html"));
    res.render("index");
  });

  app.get("/login", async function (req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      var data = await db.Gift.findAll({
        where: {
          id: req.user.id,
        },
        raw: true,
      });
      var list_data = await db.List.findAll({
        where: {
          id: req.user.id,
        },
        raw: true,
      });

      var etsy_data = await db.Etsy.findAll({ raw: true });

      var hbsObject = {
        gifts: data,
        names: req.user.first_name,
        lists: list_data,
        etsys: etsy_data,
      };
      res.render("members", hbsObject);
    }
    // res.sendFile(path.join(__dirname, "../public/login.html"));
    res.render("login");
  });
  app.get("/signup", function (req, res) {
    // If the user already has an account send them to the members page

    // res.sendFile(path.join(__dirname, "../public/signup.html"));
    res.render("signup");
  });
  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, async function (req, res) {
    // res.sendFile(path.join(__dirname, "../public/members.html"));

    var data = await db.Gift.findAll({
      where: {
        id: req.user.id,
      },
      raw: true,
    });

    app.post("/members", isAuthenticated, function (req, res) {
      console.log(req.body.userGifts);
      var data = {
        gifts: req.body.userGifts,
      };
    });

    var list_data = await db.List.findAll({
      where: {
        userId: req.user.id,
      },
      raw: true,
    });

    var etsy_data = await db.Etsy.findAll({
      raw: true,
      order: [["id", "DESC"]],
    });
    var hbsObject = {
      gifts: data,
      names: req.user.first_name,
      lists: list_data,
      etsys: etsy_data,
    };

    res.render("members", hbsObject);
  });
};
