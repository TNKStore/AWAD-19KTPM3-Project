import { PropTypes } from "prop-types";
import React, { useContext, useRef, useState } from "react";
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
  const [message, setMessage] = useState();

  const handleInputMsgChange = (msg) => {
    setMessage(msg);
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

  // const handleEventListener = () => {
  //   socket.on("sendMessageServer", (res) => {
  //     console.log(1111);
  //     setChatData((prev) => [...prev, { ...res.message }]);
  //     msgSession.push({ ...res.message });
  //     setSessionStorage(QUICK_CHAT_MSG, JSON.stringify(msgSession));
  //   });
  // };

  // const setSessionData = () => {
  //   if (msgSession.length > 0) {
  //     msgSession.forEach(question => {
  //       const isExist = chatData.find(e => e.id === question.id);

  //       if (!isExist) {
  //         setChatData(prev => [...prev, question]);
  //       }
  //     });
  //   }
  // }
  // useEffect(() => {
  //   handleEventListener();
  //   setSessionData()
  // }, []);

  (() => {
    if (messagesEndRef.current) {
      const { scrollTop, scrollHeight } = messagesEndRef.current;
      if (scrollHeight > scrollTop)
        messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  })();

  return (
    <div className={styles.chatContainer}>
      <div className={styles.chatContent} ref={messagesEndRef}>
        {data &&
          data.map((value) => (
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
