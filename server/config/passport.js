const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const GoogleUser = require("../models/GoogleUser");

passport.serializeUser((user, done) => {
  //create JWT here
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  //create JWT here
  const user = await GoogleUser.findById(id);
  done(null, user);
});
passport.use(
  new GoogleStrategy(
    {
      //options
      callbackURL: "/login/google/redirect",
      clientID:
        "348180216279-49usaj88u0qm687s6osmavjj9gg3s19i.apps.googleusercontent.com",
      clientSecret: "1H0yqcQH0EtyRQEUKeeiYNIB",
    },
    async (accessToken, refreshToken, profile, done) => {
      const user = await GoogleUser.findOne({ googleId: profile.id });
      if (!user) {
        const newUser = new GoogleUser({
          name: profile.displayName,
          googleId: profile.id,
        });
        await newUser.save();
        done(null, newUser);
      } else {
        //move to serialize
        done(null, user);
        console.log("=======user Exists");
      }
    }
  )
);
