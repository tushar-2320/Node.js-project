const userDao = require('../dao/userDao');
const UserRequestDto = require('../dtos/userRequest.js');
const UserResponseDto = require('../dtos/userResponse.js');

class UserService {
    async createUser(userData) {
        const userRequestDto = new UserRequestDto(userData.email, userData.name, userData.age, userData.city, userData.zipCode);
        const user = await userDao.createUser(userRequestDto);
        return new UserResponseDto(user.id, user.email, user.name, user.age, user.city, user.zipCode);
    }

    async getUserById(id) {
        const user = await userDao.getUserById(id);
        if (user) {
            return new UserResponseDto(user.id, user.email, user.name, user.age, user.city, user.zipCode);
        }
        return null;
    }

    async getUsers() {
        const users = await userDao.getUsers();
        return users.map(user => new UserResponseDto(user.id, user.email, user.name, user.age, user.city, user.zipCode));
    }

    async updateUser(id, userData) {
        const userRequestDto = new UserRequestDto(userData.email, userData.name, userData.age, userData.city, userData.zipCode);
        const user = await userDao.updateUser(id, userRequestDto);
        if (user) {
            return new UserResponseDto(user.id, user.email, user.name, user.age, user.city, user.zipCode);
        }
        return null;
    }

    async deleteUser(id) {
        const user = await userDao.deleteUser(id);
        if (user) {
            return new UserResponseDto(user.id, user.email, user.name, user.age, user.city, user.zipCode);
        }
        return null;
    }
}

module.exports = new UserService();
