'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

module.exports = new Schema({
    firstName:  String,
    lastName: String,
    email:   { type: String, required: true },
    password:   { type: String, required: true },
    profileImage: String,
    createdAt:   { type: Date, default: Date.now },
    updatedAt:   { type: Date, default: Date.now },
    deletedAt:   Date,
    confirmedAt:   Date,
    confirmationToken:   String,
    friends: [
        {
            userId: Schema.Types.ObjectId,
            firstName: String,
            lastName: String,
            profileImage: String
        }
    ],
    numberOfFriends: Number
});

