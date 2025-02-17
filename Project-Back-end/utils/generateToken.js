const jwt = require('jsonwebtoken')

// Genarate accessTokan

const genarateAccessToken = (user) => {
    return jwt.sign(
        {
            id:user.id,
            email:user.email,
            role:user.role,
            username:user.username,
        },
        process.env.JWT_SECRET,
        { expiresIn: '3d' }
    )
}

// Generate refreshToken

const genaraterefreshToken = (user) => {
    return jwt.sign(
        {
            id:user.id,
            email:user.email,
            role:user.role,
            username:user.username
        },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '7d' }
    )
}

module.exports = {genarateAccessToken , genaraterefreshToken }