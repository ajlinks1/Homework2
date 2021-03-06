const Express = require('express');
const BodyParser = require('body-parser');

const userContoller = require('../controllers/controller_users');

const router = Express.Router();

router.use(BodyParser.json());

router.get('/user', userContoller.getUsers);
router.get('/user/:ssn', userContoller.getUsersSsn);
router.post('/user', userContoller.postUsers);
router.delete('/user', userContoller.deleteUsers);
router.delete('/user/:ssn', userContoller.deleteUsersSsn);
router.put('/user/:ssn', userContoller.putUsers);
router.patch('/user/:ssn', userContoller.patchUser);

module.exports = router;
