/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import RemoveIcon from "@mui/icons-material/Remove";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Tab from "@mui/material/Tab";
import { PropTypes } from "prop-types";
import React, { useState } from "react";
import { chatData } from "../../mockData/chat";
import ClientChatMsg from "./ClientChatMsg";
import Question from "./Question";
import styles from "./styles.module.scss";

import { getLocalStorage } from "../../utils/localStorage";

function ChatBox(props) {
  const { isShow, onClose } = props;

  const [mockData, setMockData] = useState(chatData);
  const [message, setMessage] = useState();
  const [tabContent, setTabContent] = useState("CHAT");

  const user = getLocalStorage("user");

  const handleTabChange = (event, newTabContent) => {
    setTabContent(newTabContent);
  };

  const handleChangeMsg = (msg) => {
    setMessage(msg);
  };

  const handleSendMsg = () => {
    setMockData((prev) => [...prev, { owner: user.id, msg: message }]);
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      handleSendMsg();
    }
  };

  return (
    isShow && (
      <div className={styles.chatBoxContainer}>
        <div onClick={() => onClose()} className={styles.closeIcon}>
          <RemoveIcon />
        </div>

        <div>
          <TabContext value={tabContent}>
            <TabList
              onChange={handleTabChange}
              aria-label="lab API tabs example"
            >
              <Tab label="Chat" value="CHAT" />
              <Tab label="Make Question" value="QUESTION" />
            </TabList>
            <TabPanel value="CHAT">
              <ClientChatMsg
                data={mockData}
                handleInputMsgChange={handleChangeMsg}
                handleSendMsg={handleSendMsg}
                onEnter={handleEnter}
              />
            </TabPanel>
            <TabPanel value="QUESTION">
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
