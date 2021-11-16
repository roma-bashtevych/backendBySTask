module.exports = {
    DATABASE_URL: process.env.DATABASE_URL || 'mongodb://localhost:27017/task-nov21',
    PORT: process.env.PORT || 5000,
    REFRESH_SECRET_KEY: process.env.REFRESH_SECRET_KEY || 'REFRESH_SECRET_KEY',
    ACCESS_SECRET_KEY: process.env.ACCESS_SECRET_KEY || 'ACCESS_SECRET_KEY',
    NAME_FIRST_ADMIN: process.env.NAME_FIRST_ADMIN || 'adminka',
    PASS_FIRST_ADMIN: process.env.PASS_FIRST_ADMIN || 'ADMINKa123',
    EMAIL_FIRST_ADMIN: process.env.EMAIL_FIRST_ADMIN || 'adminka@gmail.com',
    FIRST_NAME: process.env.FIRST_NAME || 'adminka',
    LAST_NAME: process.env.LAST_NAME || 'adminka'
}
