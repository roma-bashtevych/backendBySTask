const { User } = require('../database');
const { passwordServices: { hash } } = require('../services');
const { userTypeEnum, variables: { PASS_FIRST_ADMIN, NAME_FIRST_ADMIN, EMAIL_FIRST_ADMIN, FIRST_NAME, LAST_NAME } } = require('../configuration');

module.exports = (async () => {
    const user = await User.findOne();

    if (!user) {
        const defaultAdmin = {
            username: NAME_FIRST_ADMIN,
            password: await hash(PASS_FIRST_ADMIN),
            email: EMAIL_FIRST_ADMIN,
            firstName: FIRST_NAME,
            lastName: LAST_NAME,
            role: userTypeEnum.ADMIN
        };

        await User.create(defaultAdmin);
    }
})();
