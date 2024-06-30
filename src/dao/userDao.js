const User = require('../models/UserModels.js');

class UserDao {
    async createUser(userData) {
        const user = new User(userData);
        return await user.save();
    }

    async getUserById(id) {
        return await User.findById(id).where({ isDeleted: false });
    }

    async getUsers() {
        return await User.find({ isDeleted: false });
    }

    async updateUser(id, userData) {
        return await User.findByIdAndUpdate(id, userData, { new: true }).where({ isDeleted: false });
    }

    async deleteUser(id) {
        return await User.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    }
}

module.exports = new UserDao();
