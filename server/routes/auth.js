const router = require("express").Router();
const passport = require("passport");

// auth login
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile"],
  })
);

router.get(
  "/google/redirect",
  passport.authenticate("google", {
    successRedirect: "/",
    failureRedirect: "/login",
  }),
  (req, res) => {
    res.send(req.user);
  }
);

router.get("/login", (req, res) => {
  res.send("Log in with google");
});

module.exports = router;
