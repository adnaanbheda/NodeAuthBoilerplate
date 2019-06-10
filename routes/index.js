
module.exports = (app) => {
    app.use('/api', require('./authRoutes'));
    app.use('/api/user', require('./userRoutes'));
    app.use('/api/admin', require('./adminRoutes'));
}