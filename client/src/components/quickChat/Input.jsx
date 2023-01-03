/* eslint-disable */
import SendIcon from "@mui/icons-material/Send";
import { PropTypes } from "prop-types";
import React from "react";
import styles from "./styles.module.scss";

function InputMsg(props) {
  const { handleInputMsgChange, handleSendMsg, value, placeholder } = props;

  return (
    <div className={styles.msgInput}>
      <input
        type="text"
        placeholder={placeholder}
        onChange={(e) => handleInputMsgChange(e.target.value)}
        value={value}
      />
      <SendIcon className={styles.msgInputIcon} onClick={handleSendMsg} />
    </div>
  );
}

InputMsg.propTypes = {
  handleInputMsgChange: PropTypes.func.isRequired,
  handleSendMsg: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string
};

InputMsg.defaultProps = {
  value: ""
};

export default React.memo(InputMsg);
