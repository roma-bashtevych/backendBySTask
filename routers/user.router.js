const router = require('express').Router();

const { constants: { BODY, QUERY, PARAMS, DB_FIELD, USER_ID, USERNAME }, userTypeEnum } = require('../configuration')
const { userValidators } = require('../validators')
const {
    userControllers: {
        deleteUser,
        updateUser,
        createUser,
        getAllUsers
    }
} = require('../controllers');
const {
    userMiddlewares: {
        checkUser,
        isUserPresent,
        validateDataDynamic,
        isUserNotPresent,
        getUserByDynamicParam,
        checkUserRole
    },
    authMiddlewares: {
        validateAccessToken
    }
} = require('../middlewares');

router.get('/', validateDataDynamic(userValidators.queryUserValidator, QUERY), getAllUsers);

router.post('/',
    validateDataDynamic(userValidators.createUserValidator, BODY),
    getUserByDynamicParam(USERNAME),
    isUserPresent,
    createUser);

router.delete('/:user_id',
    validateDataDynamic(userValidators.paramsUserValidator, PARAMS),
    validateAccessToken,
    getUserByDynamicParam(USER_ID, PARAMS, DB_FIELD),
    isUserNotPresent,
    checkUserRole(userTypeEnum.ADMIN),
    deleteUser);

router.patch('/:user_id',
    validateDataDynamic(userValidators.updateUserValidator, BODY),
    validateDataDynamic(userValidators.paramsUserValidator, PARAMS),
    validateAccessToken,
    getUserByDynamicParam(USER_ID, PARAMS, DB_FIELD),
    isUserNotPresent,
    checkUser,
    updateUser);

module.exports = router;
