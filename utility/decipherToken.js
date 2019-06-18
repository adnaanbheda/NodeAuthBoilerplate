const crypto = require('crypto');
const keys = require('../config/keys');
module.exports = (token) => {
    const data = token.split('.')[0];
    let iv_string = token.split('.')[1];
    let decipher = crypto.createDecipheriv('aes-256-cbc', keys.resetSecret, Buffer.from(iv_string, 'hex'));
    let decrypted = decipher.update(data, 'hex', 'utf-8');
    decrypted += decipher.final('utf-8');
    return decrypted;
}