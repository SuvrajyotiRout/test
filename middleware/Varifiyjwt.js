// const jwt = require('jsonwebtoken');
import jwt from 'jsonwebtoken'

const VarifiyUser = async (req, res, next) => {
    const AuthHeader = req.headers.Authorization || req.headers.authorization
    console.log(AuthHeader);


    if (!AuthHeader) {
        res.status(403).json({
            message: "Please Login to continue"
        })
    }
    const Token = AuthHeader.split(' ')[1]
    try {
        const decoded = jwt.verify(Token, process.env.SECRET_KEY)
        req.user = decoded
        next();
    } catch (error) {
        res.status(500).json({
            message: "Internal server error!",
            success: false
        })
    }

}

export default VarifiyUser