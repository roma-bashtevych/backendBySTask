const router = require('express').Router();

const { constants: { USERNAME } } = require('../configuration')
const { authMiddlewares: { validateLoginationData, validateAccessToken, validateRefreshToken },
userMiddlewares: {
    getUserByDynamicParam,
    isUserNotPresent
} } = require('../middlewares');
const { authControllers: { loginUser, logoutUser, refresh } } = require('../controllers');

router.post('/', validateLoginationData, getUserByDynamicParam(USERNAME), isUserNotPresent, loginUser);

router.post('/logout', validateAccessToken, logoutUser);

router.post('/refresh', validateRefreshToken, refresh);

module.exports = router;
