/* eslint-disable jsx-a11y/no-static-element-interactions */
import ChatIcon from "@mui/icons-material/Chat";
import React from "react";
import { PropTypes } from "prop-types";
import styles from "./styles.module.scss";

function ChatButton(props) {
  const { onClick } = props;

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div className={styles.chatBtn} onClick={() => onClick()}>
      <ChatIcon className={styles.chatIcon} />
    </div>
  );
}

ChatButton.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default ChatButton;
