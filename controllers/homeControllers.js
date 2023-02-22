const router = require("express").Router();
const { User, Posts } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    const postsData = await Posts.findAll({
      include: [
        {
          model: User,
          attributes: ["userName"],
        },
      ],
    });

    const posts = postsData.map((posts) => posts.get({ plain: true }));

    res.render("homepage", {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("posts/:id", async (req, res) => {
  try {
    const postsData = await Posts.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["userName"],
        },
      ],
    });

    const posts = postsData.get({ plain: true });

    res.render("project", {
      ...posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/profile", withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Posts }],
    });

    const user = userData.get({ plain: true });

    res.render("profile", {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/profile");
    return;
  }

  res.render("login");
});

module.exports = router;
