'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

module.exports = new Schema({
    content: String,
    deletedAt: Date,
    possession: {
        type: String,
        enum: ['dashboard', 'group'],
        default: 'dashboard'
    },
    possessionElementId: Schema.Types.ObjectId,
    userId: ObjectId,
    likes: [
        {
            userId: ObjectId,
            createdAt: {
                type: Date,
                default: Date.now
            }
        }
    ],
    numberOfLikes: {
        type: Number,
        default: 0
    },
    comments: [
        {
            content: String,
            createdAt: {
                type: Date,
                default: Date.now
            },
            updatedAt: {
                type: Date,
                default: Date.now
            },
            userId: Schema.Types.ObjectId
        }
    ],
    images: [String]
}, { timestamps: {} });

