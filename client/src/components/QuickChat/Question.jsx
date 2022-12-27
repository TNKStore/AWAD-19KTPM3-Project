import { NativeSelect } from "@mui/material";
import React, { useState } from "react";
import { questions } from "../../mockData/quickChat";
import styles from "./styles.module.scss";

function Question() {
  const [question, setQuestion] = useState(questions[0]);

  const handleChangeQuestion = (e) => {
    if (e.target.value) {
      const questionFind = questions.find(
        (v) => v.id === Number(e.target.value)
      );
      setQuestion(questionFind);
    }
  };

  return (
    <div className={styles.questionContainer}>
      <div className={styles.questionContent}>
        <div className={styles.questionSelect}>
          <h3>Question</h3>
          <NativeSelect
            value={questions[0].id}
            onChange={handleChangeQuestion}
            label="questionId"
          >
            {questions.map((value) => (
              <option key={value.id} value={value.id}>
                {value.question}
              </option>
            ))}
          </NativeSelect>
        </div>
        {question && (
          <div>
            <p>Total Vote: {question.totalVote}</p>
            <p>Time Asked: {question.timeAsked.toUTCString()}</p>
            <p>Status: {question.status}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Question;
