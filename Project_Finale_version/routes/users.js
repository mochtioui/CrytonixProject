var express = require('express');
var router = express.Router();
const userService = require('../services/User.service');


router.get('/', userService.loginn, userService.getuser);
router.post('/register', userService.loginn, userService.register);
router.post('/', userService.login);
router.put('/:id', userService.update);
router.put('/changepassword/:id', userService.changepassword);

router.get('/:id', userService.getById);

router.get('/testcnx', userService.loginn , function (req , res) {
    res.json({"secret": true})
    
});

module.exports = router;
