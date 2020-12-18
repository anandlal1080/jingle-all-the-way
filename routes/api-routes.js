// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");

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
    db.user
      .create({
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
    if (!req.user) {
      // The user is not logged in, send back an empty object

      res.json({});
    } else {
     
      try {
        // return the result to the user with res.json
        const list = await db.list.findAll({
          where: {
            user_id: req.user.id,
          },
        });
        console.log(list);
        res.json({
          list,
          user: {
            id: req.user.id,
            first_name: req.user.first_name,
            last_name: req.user.last_name,
          },
        });
      } catch (err) {
        res.status(500).end();
      }
    }
  });

  // Tester code to be finalized =====================================
  app.post("/api/user_lists", async function (req, res) {
    
    db.list.create({
      name: req.body.name,
      user_id: req.body.userID,
    }).then(function(){
      res.status(200);
    });
      // tester code to be deleted ===================================
      
      // =============================================================
  });
};
