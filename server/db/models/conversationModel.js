'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    messageSchema = new Schema({
        userId: Schema.Types.ObjectId,
        content: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        readAt: Date
    });

module.exports = new Schema({
    participants: [
        {
            userId: Schema.Types.ObjectId,
            firstName: String,
            lastName: String
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    },
    lastMessage: Date,
    messages: [messageSchema],
    locked: { /* True when conversation size is close to MongoDb limit - 16mb. When it will happen, the next conversation should be created. */
        type: Boolean,
        default: false
    }
});

