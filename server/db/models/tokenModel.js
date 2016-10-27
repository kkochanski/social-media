'use strict';

const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

module.exports = new Schema({
    userId: Schema.Types.ObjectId,
    token: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    validTo: Date,
    request: {
        userAgent: String,
        ip: String,
    }
}, { collection: 'tokens' });

