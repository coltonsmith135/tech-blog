const router = require('express').Router();
const userRoutes = require('./userControllers')
const postsRoutes = require('./postsControllers')

router.use('/users', userRoutes)
router.use('/posts', postsRoutes)

module.exports = router;