# CSCI4140_project
Welcome to the CSCI4140 Project backend. This document provides an overview of the project's structure, key components, and development process.


## Directory Structure and Functionality

Below is an outline of the project's directory structure along with a description of the contents and functionality of each directory and file.

- `/src` - contains source code
    - `/controllers` - contains all controllers
        - `/commentController.js` - handle the logic of comment model
        - `/itemController.js` - handle the logic of item model
        - `/messageController.js` - handle the logic of message model
        - `/notificationController.js` - handle the logic of notification model
        - `/requestController.js` - handle the logic of request model
        - `/userController.js` - handle the logic of user model
    - `/middlewares` - contains all multer
        - `/multer.js` - control media storage
    - `/notification` - include the json for notification
    - `/routes` - contains all routes
        - `/commentRoutes.js` - handle the routes of comment
        - `/itemRoutes.js` - handle the routes of item
        - `/messageRoutes.js` - handle the routes of message
        - `/notificationRoutes.js` - handle the routes of notification
        - `/requestRoutes.js` - handle the routes of request
        - `/userRoutes.js` - handle the routes of user
    - `/sequelize` - includes the sequelize related files
        - `/config` - saves the configuration
            - `/database.js` - include the database configuration
        - `/models` - includes all models
            - `/Category.js` - define the category model
            - `/Comment.js` - define the comment model
            - `/Condition.js` - define the condition model
            - `/Conevrsation.js` - define the conversation model
            - `/index.js` - holds all the models defined in the models folder
            - `/Item.js` - define the item model
            - `/Message.js` - define the message model
            - `/Notification.js` - define the notification model
            - `/Request.js` - define the request model
            - `/User.js` - define the user model
    - `/seeders` - save the seed data
        - `/server.js` - define the seed data
    - `/server.js` - entry file
- `uploads` - contains the media

# Getting Started

## Start the Application

# using npm
npm run start

## System Building Procedure

The system was built using the following procedure and key components:

1. **Set up Development Environment** - Install Node.js and npm (Node Package Manager) on the machine. You can download them from the official Node.js website (https://nodejs.org). Verify the installations by running node -v and npm -v in the terminal or command prompt.
2. **Create a New Project** - Create a new directory for the project and navigate into it using the command line. For example:
```
mkdir my-express-app
cd my-express-app
```
3. **Initialize a New Node.js Project** - un the following command to initialize a new Node.js project and follow the prompts:
```
npm init
```
This will create a package.json file in the project directory, which will track the project's dependencies and configuration.
4. **Install Express.js** - Install Express.js as a dependency for the project by running the following command:
```
npm install express
```
This will download and install the latest version of Express.js and its dependencies into the project's node_modules directory.
5. **Create an Express Application** - Create a new file named server.js in the project directory and open it in a text editor.
6. **Import Express.js and Create an Instance** - In server.js, import the Express.js module and create an instance of the Express application:
```
const express = require('express');
const app = express();
```
7. **Define Routes** - Add the following code at the end of app.js to start the Express server:
```
const port = 3000; // Choose a port number

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
```
This will start the server and listen for incoming requests on the specified port.
8. **Test the Application** - Run the following command in the project directory to start the Express application:
```
node app.js
```
Open a web browser and visit http://localhost:3000 (or the chosen port number). You should see the response from the defined route.
9. **Build and Extend the Application** - Continue building application by adding more routes, middleware, database integration, and any other required functionality. Express.js provides a wide range of features and middleware that can help build robust web applications.
10. **Deploy the Application** - Deploy the Express.js application on Render.