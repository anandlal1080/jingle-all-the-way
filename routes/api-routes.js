// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");

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
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", async function (req, res) {
    console.log(req.user);
    if (!req.user) {
      // The user is not logged in, send back an empty object

      return res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      try {
        // return the result to the user with res.json
        const userInstance = await db.User.findOne({
          where: {
            Id: req.user.id,
          },
        });
        const listItems = await userInstance.getLists();
        console.log(listItems);
        res.json({
          listItems,
          user: {
            first_name: userInstance.first_name,
          },
        });
      } catch (err) {
        res.status(500).end();
      }
    }
  });
};
