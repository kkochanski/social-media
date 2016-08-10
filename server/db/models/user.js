'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

module.exports = new Schema({
    firstName:  String,
    lastName: String,
    email:   String,
    password:   String,
    profileImage: String,
    createdAt:   { type: Date, default: Date.now },
    updatedAt:   { type: Date, default: Date.now },
    deletedAt:   Date,
    confirmedAt:   { type: Date, default: null },
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

