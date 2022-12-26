import { PropTypes } from "prop-types";
import React, { useRef, useEffect } from "react";
import styles from "./styles.module.scss";
import { getLocalStorage } from "../../utils/localStorage";
import InputMsg from "./InputMsg";

function ChatContent(props) {
  const { isOwner, content } = props;

  return (
    <div
      className={`${styles.msgContent} ${
        isOwner ? styles.owner : styles.viewer
      }`}
    >
      {!isOwner && (
        <img
          src="https://res.cloudinary.com/dkawibquv/image/upload/v1670835488/cld-sample-5.jpg"
          alt=""
        />
      )}
      <div>
        <p>{content}</p>
      </div>
    </div>
  );
}

function ClientChatMsg(props) {
  const { data, handleInputMsgChange, onEnter, handleSendMsg } = props;

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const user = getLocalStorage("user");

  useEffect(() => {
    scrollToBottom();
    console.log("end");
  }, [data]);

  return (
    <div className={styles.chatContainer} ref={messagesEndRef}>
      <div className={styles.chatContent}>
        {data.map((value) => (
          <ChatContent isOwner={user.id === value.owner} content={value.msg} />
        ))}
      </div>
      <InputMsg
        handleInputMsgChange={handleInputMsgChange}
        onEnter={onEnter}
        handleSendMsg={handleSendMsg}
      />
    </div>
  );
}

ClientChatMsg.propTypes = {
  data: PropTypes.instanceOf(Array).isRequired,
  handleInputMsgChange: PropTypes.func.isRequired,
  onEnter: PropTypes.func.isRequired,
  handleSendMsg: PropTypes.func.isRequired
};

ChatContent.propTypes = {
  isOwner: PropTypes.bool.isRequired,
  content: PropTypes.string.isRequired
};

export default React.memo(ClientChatMsg);
