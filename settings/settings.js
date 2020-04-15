const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

mongoose.Promise = global.Promise;
// const connectionUrl = process.env.ATLAS_URI;
const connectionUrl = process.env.MONGO_DB_URI;
console.log('Connecting to Mongo DB...');
mongoose.connect(connectionUrl, {useNewUrlParser: true})
    .then((data) => {
        console.log('MongoDB was connected successfully');
    }).catch((err) => {
        console.log('Unable to connect to mongoBD', err);
        process.exit();
});

module.exports = mongoose;

