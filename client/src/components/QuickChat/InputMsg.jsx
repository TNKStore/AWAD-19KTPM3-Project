import SendIcon from "@mui/icons-material/Send";
import React, { useRef } from "react";
import { PropTypes } from "prop-types";
import styles from "./styles.module.scss";

function InputMsg(props) {
  const { handleInputMsgChange, onEnter, handleSendMsg } = props;

  const textRef = useRef();

  const onChangeHandler = (e) => {
    const { target } = e;
    textRef.current.style.height = "60px";
    textRef.current.style.height = `${target.scrollHeight}px`;
  };

  return (
    <div className={styles.msgInput}>
      <textarea
        type="text"
        ref={textRef}
        placeholder="Bạn hỏi gì đi ..."
        onChange={(e) => {
          onChangeHandler(e);
          handleInputMsgChange(e.target.value);
        }}
        onKeyDown={onEnter}
      />
      <SendIcon className={styles.msgInputIcon} onClick={handleSendMsg} />
    </div>
  );
}

InputMsg.propTypes = {
  handleInputMsgChange: PropTypes.func.isRequired,
  onEnter: PropTypes.func.isRequired,
  handleSendMsg: PropTypes.func.isRequired
};

export default InputMsg;
