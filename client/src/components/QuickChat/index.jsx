/* eslint-disable */
import React, { useState } from "react";

import { PropTypes } from "prop-types";
import styles from "./styles.module.scss";
import ChatBox from "./ChatBox";
import ChatButton from "./ChatButton";
import "./overwrite.scss";

function QuickChat(props) {
  const { msgData, questionData, presentationId, isView, isDetail } = props;

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
      <ChatBox
        isShow={isShowChatBox}
        onClose={handleCloseChatBox}
        msgData={msgData}
        questionData={questionData}
        presentationId={presentationId}
        isView={isView}
        isDetail={isDetail}
      />
    </div>
  );
}

QuickChat.propTypes = {
  msgData: PropTypes.instanceOf(Array).isRequired,
  questionData: PropTypes.instanceOf(Array).isRequired,
  presentationId: PropTypes.number.isRequired,
  isView: PropTypes.bool,
  isDetail: PropTypes.bool
};

export default QuickChat;
