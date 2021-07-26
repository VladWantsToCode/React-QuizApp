import React, { useRef, useEffect } from "react";
import "./Question.css";

const Question = ({
  current,
  updateCurrent,
  question,
  isFinal,
  total,
}) => {
  const buttonRef = useRef();

  useEffect(() => {
    if (buttonRef.current) {
      buttonRef.current.disabled = true;
    }
  }, [question]);

  let choices = question
    ? [...question.incorrect_answers, question.correct_answer]
    : [];

  choices = randomArrayShuffle(choices);

  const handleSelect = (e) => {
    answer = e.target.value;
    buttonRef.current.disabled = false;
  };

  const getClassName = (param) => {
    let def = "badge text-light ";
    switch (param) {
      case "easy":
        return def.concat("bg-success");
      case "medium":
        return def.concat("bg-primary");
      default:
        return def.concat("bg-danger");
    }
  };

  let answer = "";

  return question ? (
    <div className="col-md-8 offset-md-2">
      <div className="d-flex capitalize">
        <h5>{question.category} &nbsp;</h5>
        <p>
          <span className={getClassName(question.difficulty)}>
            {question.difficulty}
          </span>
        </p>
      </div>

      <h3
        dangerouslySetInnerHTML={{
          __html: ""
            .concat(current + 1)
            .concat(". ")
            .concat(question.question),
        }}
      />
      <hr />
      <div className="funkyradio">
        {choices.map((choice) => {
          return (
            <div key={current + choice} className="funkyradio-success">
              <input
                type="radio"
                id={choice}
                name="choices"
                value={unescape(choice)}
                onChange={handleSelect}
              />
              <label
                htmlFor={choice}
                dangerouslySetInnerHTML={{ __html: choice }}
              />
            </div>
          );
        })}
      </div>
      <div className="text-right">
        <p className="mt-3">Total Items : {total}</p>
        <button
          type="button"
          ref={buttonRef}
          className="btn btn-lg btn-success btn-lg"
          onClick={() =>
            updateCurrent(current + 1, answer)
          }
        >
          {isFinal ? "Submit" : "Next"} &nbsp;
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-arrow-right-circle"
            viewBox="0 0 16 16"
          >
            <path
              d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"
            />
          </svg>
        </button>
      </div>
    </div>
  ) : (
    <></>
  );
};

function randomArrayShuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

export default Question;
