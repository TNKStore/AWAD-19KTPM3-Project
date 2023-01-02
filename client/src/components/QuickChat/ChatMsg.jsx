/* eslint-disable */
import { PropTypes } from "prop-types";
import React, { useContext, useEffect, useState, useRef } from "react";
import WebSocketContext from "../../utils/webSocketContext";
import InputMsg from "./Input";
import styles from "./styles.module.scss";
import {
  setSessionStorage,
  getSessionStorage
} from "../../utils/sessionStorage";
import Loading from "../loading";

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

  const QUICK_CHAT_MSG = "QUICK_CHAT_MSG";
  const msgSession = JSON.parse(getSessionStorage(QUICK_CHAT_MSG)) || [];

  const messagesEndRef = useRef(null);
  const socket = useContext(WebSocketContext);
  const [chatData, setChatData] = useState([]);
  const [message, setMessage] = useState();
  const [msgIndex, setMsgIndex] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const chunks = (list, chunkSize) => {
    const newList = list.sort((a, b) => b.id - a.id);
    return [...Array(Math.ceil(list.length / chunkSize))].map(() =>
      newList.splice(0, chunkSize)
    );
  };

  const initData = data.concat(msgSession);
  const msgDataResult = chunks(initData, 20);

  console.log(msgDataResult);

  const handleInputMsgChange = (msg) => {
    setMessage(msg);
  };

  const scrollToBottom = () => {
    messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
  };

  const handleSendMsg = () => {
    if (message) {
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
    }
  };

  const handleEventListener = () => {
    socket.on("sendMessageServer", (res) => {
      setChatData((prev) => [...prev, { ...res.message }]);

      msgSession.push({ ...res.message });
      setSessionStorage(QUICK_CHAT_MSG, JSON.stringify(msgSession));
    });
  };

  const handleScrollChat = async () => {
    const { scrollTop } = messagesEndRef.current;

    if (scrollTop === 0 && msgIndex < msgDataResult.length) {
      setIsLoading(true);
      await setChatData((prev) => [...prev, ...msgDataResult[msgIndex]]);
      setMsgIndex(msgIndex + 1);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleEventListener();
    setChatData(msgDataResult[0]);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [chatData]);

  return (
    <div className={styles.chatContainer}>
      {isLoading ? (
        <Loading />
      ) : (
        <div
          className={styles.chatContent}
          ref={messagesEndRef}
          onScroll={() => handleScrollChat()}
        >
          {chatData
            .sort((a, b) => a.id - b.id)
            .map((value) => (
              <ChatContent
                key={value.id}
                owner={`${value.firstName} ${value.lastName}`}
                isOwner={user.email === value.email}
                content={value.content}
              />
            ))}
        </div>
      )}

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
  presentationId: PropTypes.string.isRequired,
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
