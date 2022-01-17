import React, { useMemo } from "react";
import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { unReadConversations } from "../../store/unreadCount";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    marginLeft: 20,
    flexGrow: 1,
  },
  username: {
    fontWeight: "bold",
    letterSpacing: -0.2,
  },
  previewText: {
    fontSize: 12,
    color: "#9CADC8",
    letterSpacing: -0.17,
  },
  boldText: {
    fontWeight: "bold",
    color: "black",
    letterSpacing: -0.17,
  },
  countStyle: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "dodgerblue",
    color: "white",
    height: "1.8rem",
    width: "1.8rem",
    padding: "0.4rem",
    fontSize: "1.5rem",
    borderRadius: "50%",
  },
}));

const ChatContent = (props) => {
  const classes = useStyles();
  const { conversation, unReadConversations } = props;
  const { latestMessageText, otherUser } = conversation;
  const { unreadCount, activeConversation } = props;
  // const [count, setCount] = useState(false);
  const count = useMemo(() => {
    let sum = 0;
    if (otherUser.username !== activeConversation) {
      conversation.messages.forEach((element) => {
        if (element.read !== true && element.senderId === otherUser.id) {
          sum++;
        }
      });
    }
    return sum ? sum : null;
  }, [
    conversation.messages,
    otherUser.id,
    activeConversation,
    otherUser.username,
  ]);

  return (
    <Box className={classes.root}>
      <Box style={{ width: "100%" }}>
        <Typography className={classes.username}>
          {otherUser.username}
        </Typography>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            className={count ? classes.boldText : classes.previewText}
          >
            {latestMessageText}
          </Typography>
          <span className={count ? classes.countStyle : null}>{count}</span>
        </div>
        <></>
      </Box>
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    unreadCount: state.unreadCount,
    activeConversation: state.activeConversation,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    unReadConversations: (messages) => {
      dispatch(unReadConversations(messages));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatContent);
