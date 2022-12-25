/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { PropTypes } from "prop-types";
import React, { useState } from "react";
import RemoveIcon from "@mui/icons-material/Remove";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Question from "./Question";
import ClientChatMsg from "./ClientChatMsg";
import styles from "./styles.module.scss";

function ChatBox(props) {
  const { isShow, onClose } = props;

  const [tabContent, setTabContent] = useState("1");

  const handleChange = (event, newTabContent) => {
    setTabContent(newTabContent);
  };

  return (
    isShow && (
      <div className={styles.chatBoxContainer}>
        <div onClick={() => onClose()} className={styles.closeIcon}>
          <RemoveIcon />
        </div>
        <div className={styles.msg}>
          <input type="text" placeholder="Bạn hỏi gì đi ..." />
        </div>
        <div>
          <TabContext value={tabContent}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Chat" value="1" />
              <Tab label="Make Question" value="2" />
            </TabList>
            <TabPanel value="1">
              <ClientChatMsg isOwner />
            </TabPanel>
            <TabPanel value="2">
              <Question />
            </TabPanel>
          </TabContext>
        </div>
      </div>
    )
  );
}

ChatBox.propTypes = {
  isShow: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default ChatBox;
