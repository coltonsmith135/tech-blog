const  User  = require("../../models/User");
const router = require("express").Router();

router.post("/", async (req, res) => {
  try {
    const userData = await User.create({
      userName: req.body.username,
      password: req.body.password, 
    });

    req.session.save(() => {
      req.session.userId = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    console.log(err)
    res.status(400).json(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({
      where: { userName: req.body.username },

    });
console.log("userDATA!!!", userData)

    if (!userData) {
      res
        .status(400)
        .json({ message: "Incorrect username or password, please try again." });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect username or password, please try again" });
      return;
    }

    req.session.save(() => {
      req.session.userId = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: "You are now logged in!" });
    });
  } catch (err) {
    console.log(err)
    res.status(400).json(err);
  }
});

router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
