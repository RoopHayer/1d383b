import { addLastReadMessageToStore } from "./utils/reducerFunctions";

const GET_LAST_READ_MESSAGES = "GET_LAST_READ_MESSAGES";

export const readLastMessages = (conversation) => {
  return {
    type: GET_LAST_READ_MESSAGES,
    payload: conversation,
  };
};

const reducer = (state = [], action) => {
  switch (action.type) {
    case GET_LAST_READ_MESSAGES:
      return addLastReadMessageToStore(state, action.payload);
    default:
      return state;
  }
};

export default reducer;
