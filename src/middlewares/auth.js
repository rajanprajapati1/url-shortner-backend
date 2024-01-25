const { GetUser } = require('../services/auth');

async function restrictedToLoggedInUserOnly(req, res, next) {
    const header = req?.headers["authorization"]  ;
    const Token = header?.split(' ')[2] ;
    if (!Token) {
        return res.status(402).json({ msg: "Jwt Not Provided" });
    }
    const user = GetUser(Token);
    if (!user) {
        return res.status(400).json({ msg: "User not found" ,Token : user || "Token Expired Relogin" });
    }

    if (user && user.exp) {
        const currentTimestamp = Math.floor(Date.now() / 1000);
        if (currentTimestamp > user.exp) {
            return res.status(401).json({ msg: "Token has expired" });
        }
    }
        req.user = user;
        next();
}


module.exports = {
    restrictedToLoggedInUserOnly ,
};
