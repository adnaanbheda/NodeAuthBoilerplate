const bcrypt = require('bcrypt');
module.exports = async function (password) {
    return new Promise(resolve => bcrypt.compare(password, this.password, (err, isMatch) => {
        resolve(isMatch);
    }));
};