import React from "react";
import { Box } from "@material-ui/core";
import { SenderBubble, OtherUserBubble } from "../ActiveChat";
import { connect } from "react-redux";
import moment from "moment";

const Messages = (props) => {
  const { messages, otherUser, userId, id, lastReadMessage } = props;

  let result = lastReadMessage.find((item) => item.id === id);
  return (
    <Box>
      {messages.map((message) => {
        const time = moment(message.createdAt).format("h:mm");

        return message.senderId === userId ? (
          <SenderBubble
            key={message.id}
            msgId={message.id}
            text={message.text}
            time={time}
            otherUser={otherUser}
            lastMessage={result}
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

const mapStateToProps = (state) => {
  return {
    lastReadMessage: state.lastReadMessage,
  };
};

export default connect(mapStateToProps, null)(Messages);
