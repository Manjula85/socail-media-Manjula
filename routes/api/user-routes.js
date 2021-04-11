const router = require('express').Router();
const{
    getAllUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} = require('../../controllers/user-controllers');

// api/user
router
    .route('/')
    .get(getAllUser)
    .post(createUser);

//Set up GET one, PUT, and DELETE at api/user/:id
router
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

module.exports = router;
