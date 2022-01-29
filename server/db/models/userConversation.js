const Sequelize = require("sequelize");
const db = require("../db");
const User = require("./user");
const Conversation = require("./conversation");

const UserConversation = db.define("userConversation", {
  userId: {
    type: Sequelize.INTEGER,
    references: {
      model: User,
      key: "id",
    },
    allowNull: false,
  },
  conversationId: {
    type: Sequelize.INTEGER,
    references: {
      model: Conversation,
      key: "id",
    },
    allowNull: false,
  },
});

module.exports = UserConversation;
