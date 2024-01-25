const User = require('../models/user')
const { v4: uuidv4 } = require('uuid');
const { SetUser, GetUser } = require('../services/auth');
async function HandleUserSignup(req, res) {
    const { name, email, password } = req.body;
    const NewUser = await User.create({
        name, email, password
    })
    if (!NewUser) return res.status(400).json({ msg: "Signup FAILED", success: false })
    else { return res.status(200).json({ msg: "Signup Successfully", success: true, username: NewUser.name }) }
}
async function HandleloginUser(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({
        email
    })
    if (user && user.password === password) {
        const token = SetUser(user);
        return res.status(200).json({ msg: "Login Successfully", token: token, success: true, email: user?.email, username: user.name })
    }
    return res.status(400).json({ msg: "Login FAILED", success: false })
}
async function HandleLogOutUser(req, res) {
    return res.status(200).json({ msg: "Logged out successfully", success: true });
}
async function HandleVerifyToken(req, res) {
    const header = req?.headers["authorization"];
    const token = header?.split(' ')[2];
    if (!token) {
        return res.status(402).json({ msg: "Jwt Not Provided" });
    }
    const user = GetUser(token);
    if (!user) {
        return res.status(400).json({ msg: "User not found" });
    }
    return res.status(200).json({ msg: "Token verified successfully", success: true, user });
}

module.exports = {
    HandleloginUser,
    HandleUserSignup,
    HandleLogOutUser,
    HandleVerifyToken
};
