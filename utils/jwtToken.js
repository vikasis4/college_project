var jwt = require('jsonwebtoken');

const key = process.env.JWT_KEY

export const generateToken = async (id) => {
    var token = jwt.sign(id, key)
    return token
}

export const verifyToken = async (token) => {
    try {
        var result = jwt.verify(token, key);
        return { status: true, result }
    } catch (error) {
        return { status: false }
    }
}