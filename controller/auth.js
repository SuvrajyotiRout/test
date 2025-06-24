const user = require('../model/user');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

const Signup = async (req, res) => {
    console.log(req.body);
    try {
        const { username, email, password } = req.body;


        if (!username || !email || !password) {
            return res.status(404).json({
                message: "Please enter all the fields",
                success: false
            })
        }
        const userdt = await user.findOne({ email: email })
        if (userdt) {
            res.json({
                message: "User already exits"
            })
        }

        const hashedPassword = bcrypt.hashSync(password, 10);
        const userdata = new user({
            name: username,
            password: hashedPassword,
            email: email
        });
        await userdata.save();
        res.status(201).json({
            message: 'User Created Successfully...',
            success: true
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error!",
            success: false
        })
    }
}
const Login = async (req, res) => {
    try {
        const { email, password } = req.body;


        if (!email || !password) {
            return res.status(404).json({
                message: "Please enter all the fields",
                success: false
            })
        }
        const userdata = await user.findOne({ email: email })
        if (!userdata) {
            res.json({
                message: "User Not found..."
            })
        }

        const comaparepass = await bcrypt.compare(password, userdata.password)
        if (!comaparepass) {
            res.status(403).json({
                message: "invalid username or password"
            })
        }
        const payload = {
            name: userdata.name,
            email: userdata.email
        }
        const token = jwt.sign(payload, process.env.SECRET_KEY)
        res.status(200).json({
            message: "Login Successfull...",
            token
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal server error!",
            success: false
        })
    }
}
module.exports = {
    Signup,
    Login
}