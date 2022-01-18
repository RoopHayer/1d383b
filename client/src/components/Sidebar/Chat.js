import React from "react";
import { Box } from "@material-ui/core";
import { BadgeAvatar, ChatContent } from "../Sidebar";
import { makeStyles } from "@material-ui/core/styles";
import { setActiveChat } from "../../store/activeConversation";
import { connect } from "react-redux";
import { readConversations } from "../../store/conversations";
import { fetchConversations } from "../../store/utils/thunkCreators";
import { readLastMessages } from "../../store/lastReadMessage";

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 8,
    height: 80,
    boxShadow: "0 2px 10px 0 rgba(88,133,196,0.05)",
    marginBottom: 10,
    display: "flex",
    alignItems: "center",
    "&:hover": {
      cursor: "grab",
    },
  },
}));

const Chat = (props) => {
  const classes = useStyles();
  const { conversation } = props;
  const { otherUser } = conversation;

  const handleClick = async (conversation) => {
    props.setActiveChat(conversation.otherUser.username);
    props.readConversations(conversation.id);
    props.fetchConversations();
    props.readLastMessages(conversation);
  };

  return (
    <Box onClick={() => handleClick(conversation)} className={classes.root}>
      <BadgeAvatar
        photoUrl={otherUser.photoUrl}
        username={otherUser.username}
        online={otherUser.online}
        sidebar={true}
      />
      <ChatContent conversation={conversation} />
    </Box>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    setActiveChat: (id) => {
      dispatch(setActiveChat(id));
    },
    readConversations: (messages) => {
      dispatch(readConversations(messages));
    },
    readLastMessages: (messages) => {
      dispatch(readLastMessages(messages));
    },
    fetchConversations: () => {
      dispatch(fetchConversations());
    },
  };
};

export default connect(null, mapDispatchToProps)(Chat);
