const { User } = require('../database');

module.exports = {
    findUsers: (query) => User.find(query),

    createUser: (data) => User.create(data),

    deleteUser: (userId) => User.deleteOne(userId),

    updateUserById: (userId, data) => User.updateOne(userId, data)
};
