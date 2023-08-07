const bcrypt = require('bcrypt');

async function encryptPassword(senha) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(senha, salt);
    return hashedPassword;
}

module.exports = encryptPassword;