const { Schema, model } = require('mongoose');

const { constants: { USER, OAUTH, DRIVER } } = require('../configuration');

const OAuthSchema = new Schema({
    access_token: {
        type: String,
        required: true
    },
    refresh_token: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: DRIVER
    }
}, {timestamps: true});

module.exports = model(OAUTH, OAuthSchema);
