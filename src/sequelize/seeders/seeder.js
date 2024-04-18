// node [path]
const sequelize = require('../config/database');
const Condition = require('../models/Condition');
const User = require('../models/user');
const Item = require('../models/Item');
const Request = require('../models/Request');

const bcrypt = require('bcrypt');
const Category = require('../models/Category');
const Conversation = require('../models/Conversation');
const Message = require('../models/Message');

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

        // Create categories
        await Category.bulkCreate([
            { id: 1, name: 'Electronics', value: 'electronics' },
            { id: 2, name: 'Fashion', value: 'fashion' },
            { id: 3, name: 'Home & Kitchen', value: 'home_kitchen' },
            { id: 4, name: 'Books', value: 'books' },
            { id: 5, name: 'Toys', value: 'toys' },
            { id: 6, name: 'Sports', value: 'sports' },
            { id: 7, name: 'Beauty', value: 'beauty' },
            { id: 8, name: 'Health', value: 'health' },
            { id: 9, name: 'Kids', value: 'kids' },
            { id: 10, name: 'Others', value: 'others' },
        ])
            .then(() => {
                console.log('Categories created');
            })
            .catch((error) => {
                console.error('Error creating categories:', error);
            });

        // Create conditions
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
                image: 'uploads\\macbook-pro.jpg',
                uid: 2,
                wishlist: 'hair straightener, makeup kit',
                categoryId: 1,
                status: 'available',
            },
            {
                id: 2,
                name: 'iPhone 12',
                description: 'A smartphone for developers',
                conditionId: 1,
                image: 'uploads\\iphone-12.jpg',
                uid: 3,
                wishlist: 'macbook pro, ipad',
                categoryId: 1,
                status: 'available',
            },
        ])
            .then(() => {
                console.log('Items created');
            })
            .catch((error) => {
                console.error('Error creating items:', error);
            });
        
        await Request.bulkCreate([
            {
                id: 1,
                itemId: 1,
                uid: 2,
                availableItemId: 2,
            },
            {
                id: 2,
                itemId: 2,
                uid: 3,
                availableItemId: 1,
            },
        ])
            .then(() => {
                console.log('Request created');
            })
            .catch((error) => {
                console.error('Error creating request:', error);
            });

        await Conversation.bulkCreate([
            {
                id: 1,
                uid1: 2,
                uid2: 3,
            },
        ])
            .then(() => {
                console.log('Conversations created');
            })
            .catch((error) => {
                console.error('Error creating conversations:', error);
            });

        await Message.bulkCreate([
            {
                id: 1,
                content: 'Hello',
                uid: 2,
                type: 'text',
                conversationId: 1,
            },
            {
                id: 2,
                content: 'Hi',
                uid: 3,
                type: 'text',
                conversationId: 1,
            },
        ])
            .then(() => {
                console.log('Messages created');
            })
            .catch((error) => {
                console.error('Error creating messages:', error);
            });
        

       
    } catch (error) {
        console.error('Error:', error);
    } finally {
        // Close the database connection
        await sequelize.close();
    }

}

seed();