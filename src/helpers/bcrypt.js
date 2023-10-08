// TS.

// import bcrypt from 'bcrypt';
// const hashPassword = (plainPass: string): string => {
//   return bcrypt.hashSync(plainPass, bcrypt.genSaltSync(8));
// };
// const comparePassword = (plainPass: string, pass: string): boolean => {
//   return bcrypt.compareSync(plainPass, pass);
// };
// export { hashPassword, comparePassword };


const bcrypt = require('bcrypt')
const hashPassword = (plainPass) => {
    return bcrypt.hashSync(plainPass, bcrypt.genSaltSync(8))
}
const comparePassword = (plainPass, pass) => {
    return bcrypt.compareSync(plainPass, pass)
}
module.exports = {hashPassword, comparePassword}