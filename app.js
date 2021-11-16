const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();
const app = express();
app.use(cors());

const { variables: { DATABASE_URL, PORT }, statusCode, errorMessage: { NOT_FOUND } } = require('./configuration');
const { userRouter, authRouter } = require('./routers');

mongoose.connect(DATABASE_URL);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/ping', (req, res) => res.json('pong'));
app.use('/auth', authRouter);
app.use('/users', userRouter);

app.use('*', _notFoundError);
app.use(_mainErrorHandler);

app.listen(PORT, () => {
    console.log('App listen', PORT);
    require('./utils/defaultData');
});

function _notFoundError(err, req, res, next) {
    next({
        status: err.status || statusCode.NOT_FOUND,
        message: err.message || NOT_FOUND
    });
}

// eslint-disable-next-line no-unused-vars
function _mainErrorHandler(err, req, res, next) {
    res
        .status(err.status || statusCode.SERVER_ERROR)
        .json({
            message: err.message
        });
}
