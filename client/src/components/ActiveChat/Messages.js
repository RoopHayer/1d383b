import React, { useEffect } from "react";
import { Box } from "@material-ui/core";
import { SenderBubble, OtherUserBubble } from "../ActiveChat";
import { connect } from "react-redux";
import { readMessages } from "../../store/utils/thunkCreators";
import moment from "moment";

const Messages = (props) => {
  const {
    messages,
    otherUser,
    userId,
    id,
    latest,
    conversation,
    readMessages,
  } = props;

  useEffect(() => {
    if (messages[messages.length - 1]?.read !== true)
      return readMessages(conversation);
  }, [messages, conversation, readMessages]);
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
            latest={latest}
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
    readMessages: (conversation) => {
      dispatch(readMessages(conversation));
    },
  };
};

export default connect(null, mapDispatchToProps)(Messages);
