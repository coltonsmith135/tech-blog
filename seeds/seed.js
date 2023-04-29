const sequelize = require('../config/connection')
const { User, Posts } = require('../models')

const userData = require('./userData.json')
const postsData = require('./postsData.json')

const seedDatabase = async () => {
    await sequelize.sync({ force: true })

    const users = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    })

    for (const posts of postsData) {
        await Posts.create({
            ...posts,
            userId: users[Math.floor(Math.random() * users.length)].id,
        })
    }

    process.exit(0)
}

seedDatabase();
