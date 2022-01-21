import React, { useMemo } from "react";
import { Box, Typography, Chip } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";

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
  text: {
    display: "flex",
    justifyContent: "space-between",
  },
}));

const ChatContent = (props) => {
  const classes = useStyles();
  const { conversation, activeConversation } = props;
  const { latestMessageText, otherUser } = conversation;

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
        <Box className={classes.text}>
          <Typography
            className={count ? classes.boldText : classes.previewText}
          >
            {latestMessageText}
          </Typography>
          {count && (
            <Chip
              className={classes.count}
              label={count}
              color="primary"
              size="small"
            />
          )}
        </Box>
        <></>
      </Box>
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    activeConversation: state.activeConversation,
  };
};

export default connect(mapStateToProps, null)(ChatContent);
