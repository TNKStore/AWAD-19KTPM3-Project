/* eslint-disable */
import { NativeSelect, Button } from "@mui/material";
import { PropTypes } from "prop-types";
import React, { useState, useContext, useEffect, useRef } from "react";
import InputQuestion from "./Input";
import styles from "./styles.module.scss";
import WebSocketContext from "../../utils/webSocketContext";
import {
  setSessionStorage,
  getSessionStorage
} from "../../utils/sessionStorage";

function Question(props) {
  const { data, user, presentationId, isDetail, isView } = props;

  const QUICK_CHAT_QUESTION = `QUICK_CHAT_QUESTION_${presentationId}`;
  const questionSession = JSON.parse(getSessionStorage(QUICK_CHAT_QUESTION)) || [];

  const messagesEndRef = useRef(null);
  const socket = useContext(WebSocketContext);
  const [questionInput, setQuestionInput] = useState();
  const [questionData, setQuestionData] = useState(data);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  };

  const handleInputQuestionChange = (msg) => {
    setQuestionInput(msg);
  };

  const handleSendQuestion = () => {
    const questionRequestBody = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      content: questionInput
    };
    socket.emit("postQuestion", {
      presentationId: String(presentationId),
      question: questionRequestBody
    });
    handleInputQuestionChange("");
  };

  const handleVoteQuestion = (questionId) => {
    const requestBody = {
      presentationId: String(presentationId),
      questionId,
      questions: questionData
    };
    socket.emit("voteQuestion", requestBody);
  };

  const handleUpdateStatusQuestion = (questionId) => {
    const requestBody = {
      presentationId: String(presentationId),
      questionId,
      questions: questionData
    };
    socket.emit("markQuestion", requestBody);
  };

  const handleEventListener = () => {
    socket.on("sendQuestion", (res) => {
      setQuestionData(res.questions);
      setSessionStorage(QUICK_CHAT_QUESTION, JSON.stringify(res.questions));
    });
    socket.on("sendUpdatedVoteQuestions", (res) => {
      console.log(res.questions);
      setQuestionData(res.questions);
      setSessionStorage(QUICK_CHAT_QUESTION, JSON.stringify(res.questions));
    });
    socket.on("sendUpdatedMarkQuestions", (res) => {
      setQuestionData(res.questions);
      setSessionStorage(QUICK_CHAT_QUESTION, JSON.stringify(res.questions));
    });
  };

  const setSessionData = () => {
    if (questionSession.length > 0) {
      setQuestionData(questionSession)
    }
  }

  useEffect(() => {
    handleEventListener();
    setSessionData();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [questionData])

  return (
    <div className={styles.questionContainer}>
      <div className={styles.questionContent}>
        {questionData.length > 0 ? (
          <div className={`${styles.questionDetailBox} ${isDetail && styles.questionView}`} ref={messagesEndRef}>
            {questionData.map(question => (
              <div className={styles.questionDetail}>
                <p>
                  <span>Question: </span>{question.content}
                </p>
                <p>
                  <span>Total Vote</span>: {question.upvote}
                </p>
                <p>
                  <span>Time Asked: </span>
                  {new Date(question.updatedAt).toUTCString()}
                </p>
                <div className={styles.questionStatus}>
                  <span>Status: </span>
                  {question.isAnswered ? "ANSWERED" : "UN_ANSWER"}
                  {
                    isDetail && 
                    <input 
                      type="checkbox" 
                      onClick={() => handleUpdateStatusQuestion(question.id)} 
                      checked={question.isAnswered}
                    />
                  }
                </div>
                <div className={styles.voteQuestion}>
                  {
                    isView && 
                    <Button
                      variant="contained"
                      onClick={() => handleVoteQuestion(question.id)}
                    >
                      Vote
                    </Button>
                  }
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>No question</div>
        )}
      </div>
      {
        isView && 
        <InputQuestion
          handleInputMsgChange={handleInputQuestionChange}
          handleSendMsg={handleSendQuestion}
          value={questionInput}
          placeholder="Make your question ..."
        />
      }
    </div>
  );
}

Question.propTypes = {
  data: PropTypes.instanceOf(Array).isRequired,
  user: PropTypes.oneOfType([PropTypes.object]).isRequired,
  presentationId: PropTypes.number.isRequired,
  isView: PropTypes.bool,
  isDetail: PropTypes.bool
};

Question.defaultProps = {
  data: [],
};


export default Question;
