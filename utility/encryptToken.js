const crypto = require('crypto');
const keys = require('../config/keys');
module.exports = () => {
    return new Promise(resolve => {
        crypto.randomBytes(16, (err, buf) => {
            let cipher = crypto.createCipheriv('aes-256-cbc', keys.resetSecret, buf);
            let encrypted = cipher.update(String(Date.now()), 'utf-8', 'hex');
            encrypted += cipher.final('hex');
            encrypted += "." + Buffer.from(buf).toString('hex');
            resolve(encrypted);
        });
    });
}