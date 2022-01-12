import {
  unreadMessages
} from "./utils/reducerFunctions";

const GET_UNREAD_MESSAGES = "GET_UNREAD_MESSAGES";

export const unReadConversations = (conversation) => {
  return {
    type: GET_UNREAD_MESSAGES,
    payload: conversation,
  };
};

const reducer = (state = [], action) => {
  switch (action.type) {
      case GET_UNREAD_MESSAGES:
      return unreadMessages(
        state, action.payload
      )
    default:
      return state;
  }
};

export default reducer;
