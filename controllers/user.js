const User = require("../models/user");


module.exports.renderSignupForm = (req, res) => {
  res.render("users/signup");
};

module.exports.signup = async (req, res) => {
  try {
    let { username, email, password } = req.body;
    const newUser = new User({ email, username });
    const registeruser = await User.register(newUser, password);
    req.login(registeruser, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "Welcome to AirBnb");
      res.redirect("/listings");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/signup");
  }
};

module.exports.renderLoginForm = (req, res) => {
  res.render("users/login");
};

module.exports.login = async (req, res) => {
  req.flash("success", "Welcome Back to AirBnb, You are logged in!");
  let redirectUrl = res.locals.redirect || "/listings";
  res.redirect(redirectUrl);
};

module.exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "your are logged out!");
    res.redirect("/listings");
  });
};
