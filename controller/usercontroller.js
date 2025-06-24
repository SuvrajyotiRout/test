const user = require('../model/user');
const bcrypt = require('bcrypt')

const GetUser = async (req, res) => {
    try {
        const userData = await user.find();
        if (!userData) {
            res.json({
                message: "Data  not found"
            })
        }

        res.status(200).json({
            data: userData,
            message: "Data found"
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal server error!",
            success: false
        })
    }
}

const GetUserById = async (req, res) => {
    try {
        const userData = await user.findById(req.params.id);
        if (!userData) {
            res.json({
                message: "Data  not found"
            })
        }

        res.status(200).json({
            data: userData,
            message: "Data found"
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal server error!",
            success: false
        })
    }
}

const EditUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        console.log(req.params.id);


        if (!username || !email || !password) {
            return res.status(404).json({
                message: "Please enter all the fields",
                success: false
            })
        }
        const hashedPassword = bcrypt.hashSync(password, 10);
        const payload = {
            name: username,
            email: email,
            password: hashedPassword
        }

        console.log(payload);

        const updatedata = await user.updateOne({ _id: req.params.id }, payload)
        if (!updatedata) {
            res.json({
                message: "user not found"
            })
        }
        res.json({
            data: updatedata,
            message: "Data updated  successfully "
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal server error!",
            success: false
        })
    }
}

const DeleteUser = async (req, res) => {
    try {
        if (!req.params.id) {
            res.json({
                message: "please probide the id"
            })
        }
        const userData = await user.findByIdAndDelete(req.params.id);
        if (!userData) {
            res.json({
                message: "Usernot Found"
            })
        }

        res.status(200).json({
            data: userData,
            message: "Data deleted successfully"
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal server error!",
            success: false
        })
    }
}


module.exports = {
    GetUser,
    GetUserById,
    DeleteUser,
    EditUser
}