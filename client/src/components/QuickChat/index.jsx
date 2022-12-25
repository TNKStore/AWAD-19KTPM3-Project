import React, { useState } from "react";

import styles from "./styles.module.scss";
import ChatBox from "./ChatBox";
import ChatButton from "./ChatButton";
import "./overwrite.css";

function QuickChat() {
  const [isShowChatBox, setIsShowChatBox] = useState(false);

  const handleClickChatBtn = () => {
    setIsShowChatBox(!isShowChatBox);
  };

  const handleCloseChatBox = () => {
    setIsShowChatBox(false);
  };

  return (
    <div className={styles.container}>
      <ChatButton onClick={handleClickChatBtn} />
      <ChatBox isShow={isShowChatBox} onClose={handleCloseChatBox} />
    </div>
  );
}

export default QuickChat;
