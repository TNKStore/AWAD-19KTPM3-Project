/* eslint-disable */
import { PropTypes } from "prop-types";
import React, { useContext, useEffect, useState, useRef } from "react";
import WebSocketContext from "../../utils/webSocketContext";
import InputMsg from "./Input";
import styles from "./styles.module.scss";

function ChatContent(props) {
  const { isOwner, owner, content } = props;

  return (
    <div
      className={`${styles.msgContent} ${
        isOwner ? styles.owner : styles.viewer
      }`}
    >
      {!isOwner && <span>{owner}</span>}
      <p>{content}</p>
    </div>
  );
}

function ChatMsg(props) {
  const { data, presentationId, user } = props;

  const messagesEndRef = useRef(null);

  const socket = useContext(WebSocketContext);

  const [chatData, setChatData] = useState(data);
  const [message, setMessage] = useState();

  const handleInputMsgChange = (msg) => {
    setMessage(msg);
  };

  const scrollToBottom = () => {
    messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
  };

  const handleSendMsg = () => {
    const messageRequestBody = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      content: message
    };
    socket.emit("sendMessageClient", {
      presentationId: String(presentationId),
      message: messageRequestBody
    });
    handleInputMsgChange("");
  };

  const handleEventListener = () => {
    socket.on("sendMessageServer", (res) => {
      setChatData((prev) => [...prev, { ...res.message }]);
    });
  };

  useEffect(() => {
    handleEventListener();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [chatData]);

  return (
    <div className={styles.chatContainer}>
      <div className={styles.chatContent} ref={messagesEndRef}>
        {chatData.map((value) => (
          <ChatContent
            key={value.id}
            owner={`${value.firstName} ${value.lastName}`}
            isOwner={user.email === value.email}
            content={value.content}
          />
        ))}
      </div>
      <InputMsg
        handleInputMsgChange={handleInputMsgChange}
        handleSendMsg={handleSendMsg}
        value={message}
        placeholder="Your message ..."
      />
    </div>
  );
}

ChatMsg.propTypes = {
  data: PropTypes.instanceOf(Array).isRequired,
  presentationId: PropTypes.number.isRequired,
  user: PropTypes.oneOfType([PropTypes.object]).isRequired
};

ChatContent.propTypes = {
  isOwner: PropTypes.bool.isRequired,
  owner: PropTypes.string.isRequired,
  content: PropTypes.string
};

ChatContent.defaultProps = {
  content: null
};

export default React.memo(ChatMsg);
