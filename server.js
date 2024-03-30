
// import modules
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const http = require('http')
// const https = require('https')
const fs = require('fs')
const cookieParser = require('cookie-parser')
const mysql = require('mysql');


const app = express()
const devPort = 8080
// set is it allowed to send requests from different origins
const corsOptions = {
  origin: ['http://localhost:3000', 'https://localhost:8080', 'http://localhost:8000', 'https://localhost:8000'],
  credentials: true,            //access-control-allow-credentials:true
}

// middleware
app.use(bodyParser.json({ limit: "1mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "1mb", extended: true }))
app.use(cors(corsOptions))
app.use(cookieParser())

// for http
var httpServer = http.createServer(app);

// for local port 8080
httpServer.listen(devPort, () => {
  console.log(`Example app listening on port ${devPort}`)
})