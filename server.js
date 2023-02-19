const path = require('path')
const express = require('express')
const session = require('express-session')
const exphbs = require('express-handlebars')
const routes = require('./controllers')
const helpers = require('./utils/helpers')

const sequelize = require('./config/connection')
const sequelizeStore = require('connect-session-sequelize')(session.store)

const app = express()
const PORT = process.env.PORT || 3001

const hbs = exphbs.create({helpers})



app.listen(PORT, () => console.log('Now Listening'))