const router = require("express").Router();
const { Posts } = require("../../models/Posts");
const withAuth = require('../../utils/auth')

router.post("/", withAuth, async (req, res) => {
  try {
    const newPosts = await Posts.create({
      ...req.body,
      userId: req.session.userId,
    });

    res.status(200).json(newPosts);
  } catch (err) {
    console.log("error!:", err)
    res.status(400).json(err);
  }
});

router.delete("/:id", withAuth, async (req, res) => {
  try {
    const postsData = await Posts.destroy({
      where: {
        id: req.params.id,
        userId: req.session.userId,
      },
    });

    if (!postsData) {
      res.status(404).json({ message: "No posts found with this id!" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
