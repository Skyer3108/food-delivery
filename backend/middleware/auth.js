const jwt = require('jsonwebtoken')

const authMiddleware = async (req, res, next) => {

    const { token } = req.headers;
    if (!token) {
        return res.send({
            sucess: false,
            message: 'Not Authorized Login Again'
        })
    }

    try {

        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET)
        req.body.userId=tokenDecode.id

        next()
    }
    catch (err) {

        return res.send({
            sucess:false,
            message:err
        })

    }

}

module.exports = authMiddleware