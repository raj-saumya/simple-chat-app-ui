import React, { useState, useContext } from "react";
import "./Chat.css";
import io from "socket.io-client";
import { CTX } from "../../Utils/Store";
import { animateScroll } from "react-scroll";

const socket = io(":4000");
let gDispatch;

const sendMessageAction = ({ sender, message }) => {
  socket.emit("chat message", { sender, message });
};

socket.on("chat message", ({ sender, message }) => {
  gDispatch({ type: "RECEIVE_MSG", payload: { sender, message } });
  animateScroll.scrollToBottom({
    containerId: "messages",
    duration: 300
  });
});

const Chat = () => {
  const [message, setMessage] = useState("");
  const {
    state: { handle, chatMessages },
    dispatch
  } = useContext(CTX);

  gDispatch = dispatch;

  return (
    <div className="chat">
      <div className="chat__window">
        <div id="messages" className="messages">
          {chatMessages.map((d, i) => {
            return (
              <div
                className="messages__block"
                key={i}
                style={
                  d.sender === handle
                    ? { alignSelf: "flex-end" }
                    : { alignSelf: "flex-start" }
                }
              >
                <label className="messages--label">{d.message}</label>
                <div />
                <span className="messages--from">{d.sender}</span>
              </div>
            );
          })}
        </div>
        <div className="seperator" />
        <div className="send">
          <div className="send__input">
            <input
              type="text"
              placeholder="Enter your message"
              value={message}
              onChange={e => setMessage(e.currentTarget.value)}
            />
          </div>
          <div
            className="send__btn"
            onClick={() => {
              sendMessageAction({ sender: handle, message });
              setMessage("");
            }}
          >
            <label>Send</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
