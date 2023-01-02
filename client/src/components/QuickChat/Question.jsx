/* eslint-disable */
import { NativeSelect, Button } from "@mui/material";
import { PropTypes } from "prop-types";
import React, { useState, useContext, useEffect } from "react";
import InputQuestion from "./Input";
import styles from "./styles.module.scss";
import WebSocketContext from "../../utils/webSocketContext";

function Question(props) {
  const { data, user, presentationId } = props;

  const socket = useContext(WebSocketContext);

  const [questionInput, setQuestionInput] = useState();
  const [questionData, setQuestionData] = useState(data);
  const [question, setQuestion] = useState(questionData ? questionData[0] : {});

  const handleChangeQuestion = (e) => {
    const { value } = e.target;
    if (value) {
      const questionFind = questionData.find((v) => v.id === Number(value));
      setQuestion(questionFind);
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

  const handleEventListener = () => {
    socket.on("sendQuestion", (res) => {
      setQuestionData((prev) => [...prev, { ...res.question }]);
    });
    socket.on("sendUpdatedVoteQuestions", (res) => {
      setQuestionData(res.questions);
      setQuestion(res.question);
    });
  };

  useEffect(() => {
    handleEventListener();
  }, []);

  return (
    <div className={styles.questionContainer}>
      <div className={styles.questionContent}>
        {questionData ? (
          <>
            <div className={styles.questionSelect}>
              <h3>Question</h3>
              <NativeSelect
                defaultValue={question.id}
                onChange={handleChangeQuestion}
                label="questionId"
              >
                {questionData.map((value) => (
                  <option key={value.id} value={value.id}>
                    {value.content}
                  </option>
                ))}
              </NativeSelect>
            </div>
            <div className={styles.questionDetail}>
              <p>
                <span>Total Vote</span>: {question.upvote}
              </p>
              <p>
                <span>Time Asked</span>:{" "}
                {new Date(question.updatedAt).toUTCString()}
              </p>
              <p>
                <span>Status</span>:{" "}
                {question.isAnswered ? "ANSWERED" : "UN_ANSWER"}
              </p>
              <div className={styles.voteQuestion}>
                <Button
                  variant="contained"
                  onClick={() => handleVoteQuestion(question.id)}
                >
                  Vote
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div>No question</div>
        )}
      </div>
      <InputQuestion
        handleInputMsgChange={handleInputQuestionChange}
        handleSendMsg={handleSendQuestion}
        value={questionInput}
        placeholder="Make your question ..."
      />
    </div>
  );
}

Question.propTypes = {
  data: PropTypes.instanceOf(Array).isRequired,
  user: PropTypes.oneOfType([PropTypes.object]).isRequired,
  presentationId: PropTypes.number.isRequired
};

export default Question;
