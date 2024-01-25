const jwt = require('jsonwebtoken');
const secret = "hellomynameisRajan@123" ;

function SetUser (user) {
    const payload = {
        userId: user._id, 
        name: user.name, 
        email: user.email ,
    };
   return jwt.sign(payload,secret, { expiresIn: '1d' }) ;
}

function GetUser(user) {
    try {
        return jwt.verify(user, secret);
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            console.log('Token has expired');
        } else {
            console.error('JWT verification error:', error.message);
        }
        return null;
    }
}

module.exports = {
    SetUser ,
GetUser
};
