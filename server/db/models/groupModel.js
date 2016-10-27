'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

module.exports = new Schema({
    users: [
        {
            userId: Schema.Types.ObjectId,
            firstName: String,
            lastNAme: String,
            profileImage: String,
            joinedAt: {
                type: Date,
                default: Date.now
            },
            privilege: {
                type: String,
                enum: ['user', 'moderator', 'admin'],
                default: 'user'
            }
        }
    ],
    numberOfUsers: Number,
    name: String,
    description: String,
    icon: String,
    createdBy: {
        userId: Schema.Types.ObjectId,
        firstName: String,
        lastNAme: String,
        profileImage: String
    },
    deletedAt: Date
}, { timestamps: {} });

