/* eslint-disable max-len */
// eslint-disable-next-line import/no-extraneous-dependencies
require("dotenv").config();
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");
const mongoose = require("mongoose");
const cloudinary = require("cloudinary");

const CONFIGS = require("./configs/configs");
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users/users");
const authRouter = require("./routes/users/auths");
// API
const albumRouter = require("./routes/apis/albums");
const artistRouter = require("./routes/apis/artists");
const genreRouter = require("./routes/apis/genres");
const playlistRouter = require("./routes/apis/playLists");
const trackRouter = require("./routes/apis/tracks");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
app.use(
  session({
    secret: process.env.SESSION_KEY,
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false }
  })
);

// Please note that secure: true is a recommended option. However, it requires an https-enabled website, i.e., HTTPS is necessary for secure cookies. If secure is set, and you access your site over HTTP, the cookie will not be set. If you have your node.js behind a proxy and are using secure: true, you need to set "trust proxy" in express:

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Initialize Passport and restore authentication state, if any, from the session.
require("./configs/passport")(passport);

app.use(passport.initialize());

// Config database
mongoose.connect(process.env.MONGOOSE_URL2, { useNewUrlParser: true }, err => {
  if (err) {
    // eslint-disable-next-line no-console
    console.log(err);
  } else {
    // eslint-disable-next-line no-console
    console.log("MongoDB2 Connected!");
  }
});
// Config cloudinary
cloudinary.config(CONFIGS.CLODINARY_CONFIG);

app.use("/", indexRouter);
app.use(
  "/users",
  passport.authenticate("jwt", { session: false }),
  usersRouter
);
app.use(
  "/api/album",
  passport.authenticate("jwt", { session: false }),
  albumRouter
);
app.use(
  "/api/artist",
  passport.authenticate("jwt", { session: false }),
  artistRouter
);
app.use(
  "/api/genre",
  passport.authenticate("jwt", { session: false }),
  genreRouter
);
app.use(
  "/api/playlist",
  passport.authenticate("jwt", { session: false }),
  playlistRouter
);
app.use(
  "/api/track",
  passport.authenticate("jwt", { session: false }),
  trackRouter
);

app.use("/auth", authRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;