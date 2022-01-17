import React from "react";
import { Box } from "@material-ui/core";
import { SenderBubble, OtherUserBubble } from "../ActiveChat";
import { connect } from "react-redux";
import { readConversations } from "../../store/conversations";
import moment from "moment";

const Messages = (props) => {
  const { messages, otherUser, userId, latestMessageText, id } = props;
  console.log("latest", latestMessageText);

  return (
    <Box>
      {messages.map((message) => {
        const time = moment(message.createdAt).format("h:mm");

        return message.senderId === userId ? (
          <SenderBubble
            key={message.id}
            text={message.text}
            time={time}
            status={message.read}
            latestMessageText={latestMessageText}
            otherUser={otherUser}
            lastMessage={messages.length - 1}
          />
        ) : (
          <OtherUserBubble
            key={message.id}
            text={message.text}
            time={time}
            otherUser={otherUser}
            id={id}
          />
        );
      })}
    </Box>
  );
};
const mapDispatchToProps = (dispatch) => {
  return {
    readConversations: (messages) => {
      dispatch(readConversations(messages));
    },
  };
};
export default connect(null, mapDispatchToProps)(Messages);
