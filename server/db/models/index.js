const Conversation = require("./conversation");
const User = require("./user");
const Message = require("./message");
const UserConversation = require("./userConversation");

// associations

Message.belongsTo(Conversation);
Conversation.hasMany(Message);
User.belongstoMany(Conversation, { through: UserConversation });
Conversation.belongstoMany(User, { through: UserConversation });

module.exports = {
  User,
  Conversation,
  Message,
};
