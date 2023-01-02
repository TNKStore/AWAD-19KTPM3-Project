/* eslint-disable */
import RemoveIcon from "@mui/icons-material/Remove";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Tab from "@mui/material/Tab";
import { PropTypes } from "prop-types";
import React, { useState } from "react";
import { getLocalStorage } from "../../utils/localStorage";
import ChatMsg from "./ChatMsg";
import Question from "./Question";
import styles from "./styles.module.scss";

function ChatBox(props) {
  const { isShow, onClose, msgData, questionData, presentationId } = props;

  const user = getLocalStorage("user");

  const [tabContent, setTabContent] = useState("CHAT");

  const handleTabChange = (event, newTabContent) => {
    setTabContent(newTabContent);
  };

  return (
    isShow && (
      <div className={styles.chatBoxContainer}>
        <div onClick={() => onClose()} className={styles.closeIcon}>
          <RemoveIcon />
        </div>

        <div>
          <TabContext value={tabContent}>
            <TabList onChange={handleTabChange}>
              <Tab label="Chat" value="CHAT" />
              <Tab label="Question" value="QUESTION" />
            </TabList>
            <TabPanel value="CHAT">
              <ChatMsg
                user={user}
                data={msgData}
                presentationId={presentationId}
              />
            </TabPanel>
            <TabPanel value="QUESTION">
              <Question
                user={user}
                data={questionData}
                presentationId={presentationId}
              />
            </TabPanel>
          </TabContext>
        </div>
      </div>
    )
  );
}

ChatBox.propTypes = {
  isShow: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  msgData: PropTypes.instanceOf(Array).isRequired,
  questionData: PropTypes.instanceOf(Array).isRequired,
  presentationId: PropTypes.number.isRequired
};

export default ChatBox;
