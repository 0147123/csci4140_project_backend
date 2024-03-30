
// import modules
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const http = require('http')
const cookieParser = require('cookie-parser')
const sequelize = require('./sequelize/config/database')
const userRoutes = require('./routes/users')

const app = express()
const devPort = 3000
// set is it allowed to send requests from different origins
const corsOptions = {
  origin: ['http://localhost:3000', 'https://localhost:8080', 'http://localhost:8000', 'https://localhost:8000'],
  credentials: true,            //access-control-allow-credentials:true
}

// Connect to the database
sequelize
  .authenticate()
  .then(() => {
    console.log('Connected to the database');
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
  });

// middleware
app.use(bodyParser.json({ limit: "1mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "1mb", extended: true }))
app.use(cors(corsOptions))
app.use(cookieParser())

// routes
app.use('/users', userRoutes)

// for http
var httpServer = http.createServer(app);

// for local port 8080
httpServer.listen(devPort, () => {
  console.log(`Example app listening on port ${devPort}`)
})