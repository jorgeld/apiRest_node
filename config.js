// module.exports = {
//     port : process.env.PORT || 3000,
//     // db : process.env.MONGODB || 'mongodb://admin:admin@ds147965.mlab.com:47965/filomax',
//     db : process.env.MONGODB || 'mongodb://admin:admin@cluster0.7tyxz.mongodb.net/test',
// };

module.exports = {
    PORT: process.env.PORT || 3000,
    MONGODB_HOST: process.env.MONGODB_HOST || 'localhost',
    MONGODB_DATABASE: process.env.MONGODB_DB || 'notes-app'
};