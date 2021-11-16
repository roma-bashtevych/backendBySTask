const { Schema, model } = require('mongoose');

const { userTypeEnum } = require('../configuration');

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    role: {
        type: String,
        default: userTypeEnum.DRIVER,
        enum: Object.values(userTypeEnum)
    }
}, { timestamps: true });

module.exports = model(userTypeEnum.DRIVER, userSchema);
