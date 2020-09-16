import React, { createContext, useReducer, useContext } from "react";
import io from "socket.io-client";

let socket;

const initialState = {
  handle: "",
  chatMessages: [
    {
      sender: "",
      message: "Welcome to Simple Chat using Socket.io"
    }
  ]
};

export const CTX = createContext();

const reducer = (state, action) => {
  const { handle, sender, message } = action.payload;
  switch (action.type) {
    case "SET_HANDLE":
      return { ...state, handle };
    case "RECEIVE_MSG":
      return {
        ...state,
        chatMessages: [
          ...state.chatMessages,
          {
            sender,
            message
          }
        ]
      };
    default:
      return state;
  }
};

const sendMessageAction = ({ sender, message }) => {
  socket.emit("chat message", { sender, message });
};

const Store = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // if (!socket && 0) {
  //   socket = io(":4000");
  //   socket.on("chat message", ({ sender, message }) => {
  //     dispatch({ type: "RECEIVE_MSG", payload: { sender, message } });
  //   });
  // }

  return <CTX.Provider value={{ state, dispatch }}>{children}</CTX.Provider>;
};

export default Store;
