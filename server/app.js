var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var graphqlHTTP = require("express-graphql");
var schema = require("./graphql/logoSchemas");
var cors = require("cors");
const cookiesession = require("cookie-session");
const passport = require("passport");

var passportConfig = require("./config/passport");

mongoose
  .connect("mongodb://localhost/node-graphql", {
    promiseLibrary: require("bluebird"),
    useNewUrlParser: true,
  })
  .then(() => console.log("connection successful"))
  .catch((err) => console.error(err));

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var authRouter = require("./routes/auth");

var app = express();
app.use("*", cors());
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");
app.use(cookiesession({ maxAge: 24 * 60 * 60 * 1000, keys: ["SecretKey"] }));
app.use(passport.initialize());
app.use(passport.session());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use(
  "/login",

  authRouter
);

app.use(
  "/graphql",
  cors({ origin: "http://localhost:3001", credentials: true }),
  graphqlHTTP({
    schema: schema,
    rootValue: global,
    graphiql: true,
  })
);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
