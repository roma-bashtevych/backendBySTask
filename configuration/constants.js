module.exports = {
    EMAIL_REGEXP: new RegExp(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/),
    PASSWORD_REGEXP: new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/),
    QUERY: 'query',
    BODY: 'body',
    PARAMS: 'params',
    USER_ID: 'user_id',
    EMAIL: 'email',
    DB_FIELD: '_id',
    USERNAME: 'username',
    OAUTH: 'oauth',
    USER: 'user',
    DRIVER: 'driver',
    ACCESS: 'access',
    REFRESH: 'refresh',
    AUTHORIZATION: 'authorization'
}
