const bcrypt = require('bcrypt');

module.exports = function (password) {
    const hashedPassword = new Promise((resolve, reject) => {
        bcrypt.hash(password, saltRounds, function (err, hash) {
            if (err) reject(err);
            resolve(hash);
        });
    });
    return hashedPassword;
}