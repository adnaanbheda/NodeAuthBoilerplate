module.exports = async () => {
    const path = require('path');
    const fs = require('fs');
    const modelsPath = path.resolve(process.cwd() + "/models")
    await fs.readdirSync(modelsPath).forEach(file => {
        require(modelsPath + '/' + file);
    })
}