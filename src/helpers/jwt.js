const jwt= require('jsonwebtoken')
const secret = process.env.JWT_SECRET
// console.log(process.env);
const createToken = (payLoad) => {
    return jwt.sign(payLoad, secret)
}

const decodeToken = (token) => {
    return jwt.verify(token, secret)
}
module.exports = {createToken, decodeToken}