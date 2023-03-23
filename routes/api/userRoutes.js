const router = require('express').Router();
// REQUIRED routes for users
const {
    getUsers,
    getOneUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
}= require('../../controllers/userController');
// ADDED REQUIREMENT -  GET users and Posts
router.route('/').get(getUsers).post(createUser);

// ADDED REQUIREMENT -  GET one user. Update and delete a user
router.route('/:userId')
.get(getOneUser)
.put(updateUser)
.delete(deleteUser);

// ADDED REQUIREMENT - CREATE and DELETE a friend
router.route('/:userId/friends/:friendId')
.post(addFriend)
.delete(deleteFriend);

module.exports = router;