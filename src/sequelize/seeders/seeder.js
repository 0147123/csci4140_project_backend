// node [path]
const sequelize = require('../config/database');
const Condition = require('../models/Condition');
const User = require('../models/user');
const Item = require('../models/Item');
const ExchangeList = require('../models/ExchangeList');

const bcrypt = require('bcrypt');

async function encryptPassword(password) {
    return bcrypt.hash(password, 10);
}

async function seed() {
    try {
        // Connect to the database
        await sequelize.authenticate();
        console.log('Connected to the database');

        // Sync the model with the database to create the table
        await sequelize.sync({ force: true });
        console.log('User table created');

        await Condition.bulkCreate([
            { id: 1, name: 'Brand New', value: 'brand_new'},
            { id: 2, name: 'As New', value: 'as_new'},
            { id: 3, name: 'Half New', value: 'half_new'},
            { id: 4, name: 'Old', value: 'old'},
        ])
            .then(() => {
                console.log('Conditions created');
            })
            .catch((error) => {
                console.error('Error creating conditions:', error);
            });

        // Create users
        await User.bulkCreate([
            { uid: 1, role: 'admin', username: 'admin', email: 'admin@example.com', password: await encryptPassword('admin')},
            { uid: 2, username: 'vincy', email: 'vincy@example.com', password: await encryptPassword('test123321') },
            { uid: 3, username: 'june', email: 'june@example.com', password: await encryptPassword('test123321') },
        ])
            .then(() => {
                console.log('Users created');
            })
            .catch((error) => {
                console.error('Error creating users:', error);
            });

        await Item.bulkCreate([
            {
                id: 1,
                name: 'MacBook Pro',
                description: 'A laptop for developers',
                conditionId: 1,
                image: 'macbook-pro.jpg',
                uid: 2,
                wishlist: 'hair straightener, makeup kit'
            },
            {
                id: 2,
                name: 'iPhone 12',
                description: 'A smartphone for developers',
                conditionId: 1,
                image: 'iphone-12.jpg',
                uid: 3,
                wishlist: 'macbook pro, ipad'
            },
        ])
            .then(() => {
                console.log('Items created');
            })
            .catch((error) => {
                console.error('Error creating items:', error);
            });
        
        await ExchangeList.bulkCreate([
            {
                id: 1,
                itemId: 1,
                availableItemId: 2,
            },
            {
                id: 2,
                itemId: 2,
                availableItemId: 1,
            },
        ])
            .then(() => {
                console.log('Exchange lists created');
            })
            .catch((error) => {
                console.error('Error creating exchange lists:', error);
            });
        

       
    } catch (error) {
        console.error('Error:', error);
    } finally {
        // Close the database connection
        await sequelize.close();
    }

}

seed();