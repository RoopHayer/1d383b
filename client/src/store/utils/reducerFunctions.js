import { updateMessage } from "./thunkCreators";
export const addMessageToStore = (state, payload) => {
  const { message, sender } = payload;
  // if sender isn't null, that means the message needs to be put in a brand new convo
  if (sender !== null) {
    const newConvo = {
      id: message.conversationId,
      otherUser: sender,
      messages: [message],
    };
    newConvo.latestMessageText = message.text;
    return [newConvo, ...state];
  }

  return state.map((convo) => {
    if (convo.id === message.conversationId) {
      const convoCopy = { ...convo };
      convoCopy.messages = [...convo.messages, message];
      convoCopy.latestMessageText = message.text;
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const addOnlineUserToStore = (state, id) => {
  return state.map((convo) => {
    if (convo.otherUser.id === id) {
      const convoCopy = { ...convo };
      convoCopy.otherUser = { ...convoCopy.otherUser, online: true };
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const removeOfflineUserFromStore = (state, id) => {
  return state.map((convo) => {
    if (convo.otherUser.id === id) {
      const convoCopy = { ...convo };
      convoCopy.otherUser = { ...convoCopy.otherUser, online: false };
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const addSearchedUsersToStore = (state, users) => {
  const currentUsers = {};

  // make table of current users so we can lookup faster
  state.forEach((convo) => {
    currentUsers[convo.otherUser.id] = true;
  });

  const newState = [...state];
  users.forEach((user) => {
    // only create a fake convo if we don't already have a convo with this user
    if (!currentUsers[user.id]) {
      let fakeConvo = { otherUser: user, messages: [] };
      newState.push(fakeConvo);
    }
  });

  return newState;
};

export const addNewConvoToStore = (state, recipientId, message) => {
  return state.map((convo) => {
    if (convo.otherUser.id === recipientId) {
      const convoCopy = { ...convo };
      convoCopy.messages = [...convo.messages, message];
      convoCopy.latestMessageText = message.text;
      convoCopy.id = message.conversationId;
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const readMessages = (state, payload) => {
  return state.map((convo) => {
    console.log("convo", convo);
    if (convo.id === payload) {
      const convoCopy = { ...convo };
      convoCopy.messages = [...convo.messages];
      convoCopy.messages.forEach((msg) => {
        if (convoCopy.otherUser.id === msg.senderId) {
          msg.read = true;
          updateMessage({ id: msg.id });
        }
      });
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const unreadMessages = (state, payload) => {
  const newState = [...state];
  let newConvo = [...payload.messages];
  let count = null;
  newConvo.forEach((msg) => {
    if (payload.otherUser.id === msg.senderId) {
      if (!msg.read) {
        count++;
      }
    }
  });
  let body = {
    id: payload.id,
    count: count,
  };
  const idx = newState.findIndex((element) => body.id === element.id);
  if (idx > -1) {
    newState[idx].count = count;
    return newState;
  } else {
    return [...newState, body];
  }
};
