import React, { useEffect} from "react";
import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { unReadConversations} from "../../store/unreadCount";

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
}));

const ChatContent = (props) => {
  const classes = useStyles();
  const { conversation, conversations } = props;
  const { latestMessageText, otherUser } = conversation;
  const {unreadCount} = props;

    const countUnread =()=>{
    console.log('inside hello')
    let idx = unreadCount.findIndex((element)=>element.id===conversation.id);
     if(idx>-1){
     console.log('-----unreadCount',unreadCount[idx].count);
     return unreadCount[idx].count;
     } 
     return null;
    }
  useEffect( ()=>{
    props.unReadConversations(conversation);
  },[])
    //  console.log('-----',count)


  return (
    <Box className={classes.root}>
      <Box>
        <Typography className={classes.username}>
          {otherUser.username}
        </Typography>
        <Typography className={classes.previewText}>
          {latestMessageText}<span style={{background:'skyBlue', color:'black',fontSize:'bold', margin:'4rem'}}>
          { countUnread()}</span>
        </Typography>
      </Box>
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    unreadCount: state.unreadCount,
    conversations:state.conversations
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    unReadConversations:(messages)=>{
      dispatch(unReadConversations(messages))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatContent);
