const mongoose = require('mongoose');
//console.log("MONGO URI",process.env.MONGODB_URI)

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/bookdb');

// mongoose.connect("mongodb+srv://uriahmccarthy:uriahmccarthy@cluster0.dacwagj.mongodb.net/?retryWrites=true&w=majority");

module.exports = mongoose.connection;
