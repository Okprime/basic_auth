const usersModel = require('../model/users');
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = {
    async hashPassword(data) {
       return bcrypt.hash(data.password, saltRounds).then(await function(hash) {
            return hash;
        });
    },

    async saveUser(data) {
        const hashed = await this.hashPassword(data);
        const format = {
            username: data.username,
            email: data.email,
            password: hashed,
        };
        return usersModel.create(format);
    },

    async getUser(data) {
        return usersModel.findOne(data);
        // console.log('yes', yes);
    },

    async validateUser(param) {
        const { username, password } = param;
        const response = await this.getUser({ username });
        if (response) {
            console.log('response', response);
        } else {
            console.log('No data found');
            return null;
        }
        // Load hash from your password DB.
        return bcrypt.compare(password, response.password).then(function(result) {
            return result;
        });
    }
};
