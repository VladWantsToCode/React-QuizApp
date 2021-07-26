import { useState } from "react";
import StartPage from "./StartPage";
import Questions from "./Questions";
import Result from "./Result";
import Loading from "./Loading";
import "./App.css";
import axios from "axios";

let loggedName = "";
let questionsList = [];
let results = [];

function App() {
  const [start, setStart] = useState(true);
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState(false);
  const [result, setResult] = useState(false);

  const setConfigValue = (param) => {
    loggedName = param.name;
    setStart(false);
    setLoading(true);
    axios
      .get(param.url)
      .then((data) => {
        if (data.data.results) {
          questionsList = data.data.results;
          setLoading(false);
          setQuestions(true);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const setResultValue = (result) => {
    results = result;
    setQuestions(false);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setResult(true);
    }, 500);
  };

  const restartGame = () => {
    setResult(false);
    setStart(true);
  };

  return (
    <div className="container">
      <div className="row mt-5 mb-5">
        {start && (
          <StartPage setConfigValue={setConfigValue} loggedName={loggedName} />
        )}
        {loading && <Loading />}
        {questions && (
          <Questions
            questionsList={questionsList}
            setResultValue={setResultValue}
          />
        )}
        {result && (
          <Result
            results={results}
            loggedName={loggedName}
            restartGame={restartGame}
          />
        )}
      </div>
    </div>
  );
}

export default App;
