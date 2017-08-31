const mongoose = require("mongoose");
const findOrCreate = require("mongoose-findorcreate");
const Schema = mongoose.Schema;

const User = require("./user");

const Chat = new Schema({
    members: [
        {
            type: Schema.Types.ObjectId,
            ref: 'users',
            required: true,
            index: true
        }
    ],
    unreadBy: {
        type: Schema.Types.ObjectId,
        ref: User
    }
});

Chat.plugin(findOrCreate);

Chat.methods.isUnread = function (userId) {
    return this.unreadBy && this.unreadBy.equals(userId);
};

Chat.methods.getJSON = function (userId) {
    let buddyId;

    let buddy = this.members.find((element, index, array) => {
        return element._id != userId;
    });

    return {
        id: this._id,
        unread: this.isUnread(),
        buddy: buddy
    };
};

Chat.methods.markRead = function (userId) {
    if (this.isUnread()) {
        this.unreadBy = null;
        this.save();
    }
};

module.exports = mongoose.model('chats', Chat);
