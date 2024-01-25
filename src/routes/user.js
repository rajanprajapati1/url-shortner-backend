const { HandleloginUser ,HandleUserSignup,HandleLogOutUser, HandleVerifyToken} = require('../controllers/user');
const { restrictedToLoggedInUserOnly } = require('../middlewares/auth');

const router = require('express').Router();

router.post("/login",HandleloginUser)
.post("/signup",HandleUserSignup)
.post("/logout",restrictedToLoggedInUserOnly ,HandleLogOutUser)
.get("/verify-token", restrictedToLoggedInUserOnly, HandleVerifyToken); 




module.exports =  router;