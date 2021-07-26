import React, { useEffect, useState, useLayoutEffect } from "react";
import Question from "./Question";
import Loading from "./Loading";

let constQuestionsList = [];
let answersList = [];

const checkFinal = () => {
  let summary = [];
  let correct = 0;

  for (let x = 0; x < constQuestionsList.length; x++) {
    if (constQuestionsList[x].correct_answer === answersList[x]) {
      summary.push({
        status: "Correct",
        myAnswer: answersList[x],
        correctAnswer: constQuestionsList[x].correct_answer,
      });
      correct++;
    } else {
      summary.push({
        status: "Wrong",
        myAnswer: answersList[x],
        correctAnswer: constQuestionsList[x].correct_answer,
      });
    }
  }
  answersList = [];
  return {
    summary: summary,
    correct: correct,
    total: constQuestionsList.length,
  };
};

export default function Questions({ questionsList, setResultValue }) {
  const [current, setCurrent] = useState(-1);

  const updateCurrent = (num, ans) => {
    if (ans !== undefined) {
      answersList.push(ans);
    }
    setCurrent(num);
    if(num === questionsList.length){
      setResultValue(checkFinal());
    }
  };

  const isFinal = current === constQuestionsList.length - 1;

  useEffect(() => {
    constQuestionsList = questionsList;
    updateCurrent(0);
  }, [questionsList]);

  useLayoutEffect(()=>{
    setTimeout(()=>{
        <Loading/>
    }, 
    500)
  },[current]);
  
  return (
    <React.Fragment>
      <Question
        current={current}
        updateCurrent={updateCurrent}
        question={constQuestionsList[current]}
        isFinal={isFinal}
        total={constQuestionsList.length}
      />
    </React.Fragment>
  );
}
