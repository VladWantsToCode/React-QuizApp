import { useState, useEffect } from "react";
import { useFetch } from "./useFetch";
import Loading from "./Loading";

const StartPage = ({ setConfigValue, loggedName }) => {
  const apiEndpoint = "https://opentdb.com/";
  const quizCategoryEndpoint = "api_category.php";
  const quizSlug = "api.php?";

  let categoryList = [];
  const difficultyList = [
    { display: "Any Difficulty", value: "" },
    { display: "Easy", value: "easy" },
    { display: "Medium", value: "medium" },
    { display: "Hard", value: "hard" },
  ];
  const typeList = [
    { display: "Any Type", value: "" },
    { display: "Multiple Choice", value: "multiple" },
    { display: "True/False", value: "boolean" },
  ];

  const { done, data } = useFetch(
    `${apiEndpoint.concat(quizCategoryEndpoint)}`
  );
  if (done) {
    const { trivia_categories } = data.data;
    const firstCategory = [{ id: 0, name: "Any Category" }];

    categoryList = firstCategory.concat(trivia_categories);
  }

  const [config, setConfig] = useState({
    name: loggedName,
    category: "",
    difficulty: "",
    type: "",
    noOfQuestions: "",
  });

  useEffect(() => {
    updateName(loggedName);
  }, []);

  const updateName = (name) => {
    setConfig({ ...config, name: loggedName });
  };
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setConfig({ ...config, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let url = `${apiEndpoint
      .concat(quizSlug)
      .concat("amount=")
      .concat(parseInt(config.noOfQuestions))}`;
    url = url.concat(
      config.category === ""
        ? ""
        : "&category=".concat(parseInt(config.category))
    );
    url = url.concat(
      config.difficulty === "" ? "" : "&difficulty=".concat(config.difficulty)
    );
    url = url.concat(config.type === "" ? "" : "&type=".concat(config.type));

    setConfigValue({ name: config.name, url: url });
  };

  return (
    <>
      {done ? (
        <div className="col-md-4 offset-md-4 card p-3">
          <div className="text-center">
            <img
              src="https://icons.iconarchive.com/icons/fasticon/comic-3/128/files-edit-icon.png"
              alt="quiz"
            />
            <h1>Quiz App</h1>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-group mt-4">
              <label htmlFor="name">Name : </label>
              <input
                type="text"
                id="name"
                name="name"
                className="form-control"
                value={config.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="category">Category : </label>
              <select
                id="category"
                name="category"
                className="form-control"
                selected={config.category}
                onChange={handleChange}
              >
                {categoryList.map((category) => {
                  const { id, name } = category;
                  return (
                    <option key={category.id} value={id}>
                      {name}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="difficulty">Difficulty : </label>
              <select
                id="difficulty"
                name="difficulty"
                className="form-control"
                selected={config.difficulty}
                onChange={handleChange}
              >
                {difficultyList.map((difficulty) => {
                  const { display, value } = difficulty;
                  return (
                    <option key={value} value={value}>
                      {display}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="typeChoice">Type : </label>
              <select
                id="typeChoice"
                name="type"
                className="form-control"
                selected={config.type}
                onChange={handleChange}
              >
                {typeList.map((type) => {
                  const { display, value } = type;
                  return (
                    <option key={value} value={value}>
                      {display}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="noOfQuestions">No. of Questions</label>
              <input
                type="number"
                id="noOfQuestions"
                name="noOfQuestions"
                className="form-control"
                value={config.noOfQuestions}
                onChange={handleChange}
                max={50}
                min={1}
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-block btn-primary btn-lg mt-4"
            >
              Start &nbsp;
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-file-earmark-play"
                viewBox="0 0 16 16"
              >
                <path d="M6 6.883v4.234a.5.5 0 0 0 .757.429l3.528-2.117a.5.5 0 0 0 0-.858L6.757 6.454a.5.5 0 0 0-.757.43z" />
                <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z" />
              </svg>
            </button>
          </form>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default StartPage;
