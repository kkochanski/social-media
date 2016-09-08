'use strict';

const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

module.exports = new Schema({
    userId: Schema.Types.ObjectId,
    createdAt: {
        type: Date,
        default: Date.now
    },
    validTo: Date
});

