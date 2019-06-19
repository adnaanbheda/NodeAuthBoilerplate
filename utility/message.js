module.exports = (success, data) => {
    const type = typeof data;
    if (type == "object") {
        return {
            success: success,
            ...data
        }
    }
    else if (type == "string") {
        return {
            success: success,
            message: data
        }
    }
}