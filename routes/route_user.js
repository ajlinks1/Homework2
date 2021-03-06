const Express = require('express');
const BodyParser = require('body-parser');

const userController = require('../controllers/controller_users');

const router = Express.Router();

router.use(BodyParser.json());

router.get('/users', userController.getUsers);
router.get('/users/:ssn', userController.getUsersSsn);
router.post('/users', userController.postUsers);
router.delete('/users', userController.deleteUsers);
router.delete('/users/:ssn', userController.deleteUsersSsn);
router.put('/users/:ssn', userController.putUsers);
router.patch('/users/:ssn', userController.patchUser);

module.exports = router;
