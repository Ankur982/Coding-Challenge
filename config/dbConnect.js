const mongoose = require('mongoose');


// functtion to connect mongodb

const dbConnect = async() => {

    mongoose.set('strictQuery', false);
    
    await mongoose.connect(process.env.MONGO_URL)

}

module.exports = dbConnect;

