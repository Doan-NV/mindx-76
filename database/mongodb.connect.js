const mongoose = require('mongoose');
const connectMongodb = async () => {
    mongoose.connect('mongodb://127.0.0.1:27017/test').then(() => {
        console.log('Connected to MongoDB');
    }).catch((error) => {
        console.log('Error:', error);
    });
}

module.exports = connectMongodb;