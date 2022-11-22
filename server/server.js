const express = require("express");
const cors = require("cors");
const sequelize = require("./app/models");
const session = require("express-session");
const passport = require("./app/passport")
const authRouter = require('./app/components/auth');

const app = express();

const corsOptions = {
  origin: "http://localhost:4001"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(session({ secret: "my-super-secret-key" }));
app.use(passport.initialize());
app.use(passport.session());

// simple route
app.get("/", passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

app.use("/", authRouter);

// set port, listen for requests
const PORT = process.env.PORT || 4000;
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}.`);
    });

    sequelize.sync({ alter: true }).then(() => {
      console.log("Drop and re-sync db.");
    });
  })
  .catch(err => console.error('Unable to connect to the database:', err));