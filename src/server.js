
// import modules
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const http = require('http')
const cookieParser = require('cookie-parser')
const sequelize = require('./sequelize/config/database')
const userRoutes = require('./routes/userRoutes')
const commentRoutes = require('./routes/commentRoutes')
const itemRoutes = require('./routes/itemRoutes')
const messageRoutes = require('./routes/messageRoutes')
const requestRoutes = require('./routes/requestRoutes')
const notificationRoutes = require('./routes/notificationRoutes')
const multerMiddleware = require('./middlewares/multer')

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
app.use(express.json())
app.use(bodyParser.json({ limit: "1mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "1mb", extended: true }))
app.use(cors(corsOptions))
app.use(cookieParser())
app.use(multerMiddleware.single('img')); 
app.use('/uploads', express.static('uploads'));

// routes
app.use('/users', userRoutes)
app.use('/comments', commentRoutes)
app.use('/items', itemRoutes)
app.use('/messages', messageRoutes)
app.use('/requests', requestRoutes)
app.use('/notifications', notificationRoutes)

// notifications
var admin = require("firebase-admin");
var serviceAccount = require("./notification/csci4140-302fd-firebase-adminsdk-kr3kc-8b0aaf8433.json");
admin.initializeApp({
 credential: admin.credential.cert(serviceAccount)
});

// for http
var httpServer = http.createServer(app);

// for local port 8080
httpServer.listen(devPort, () => {
  console.log(`Example app listening on port ${devPort}`)
})