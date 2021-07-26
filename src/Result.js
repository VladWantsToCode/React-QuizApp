const Result = ({ results, loggedName, restartGame }) => {
  const { summary, correct, total } = results;
  
  const getItemClass = (status) =>{
    let sameClass = "list-group-item list-group-item-action p-2 font-weight-bold ";
    if(status.toLowerCase() === "wrong"){
      return sameClass.concat("list-group-item-danger");
    }else{
      return sameClass.concat("list-group-item-success");
    }
  }
  return (
    <>
      <div className="col-md-8 offset-md-2">
        <div className="card">
          <div className="text-right cross">
            <i className="fa fa-times"></i>
          </div>
          <div className="card-body text-center">
            <img
              src="https://img.icons8.com/bubbles/200/000000/trophy.png"
              alt="congrats"
            />
            <h4>CONGRATULATIONS! {loggedName}</h4>
            <p>Below are the summary of your quiz. Thank you.</p>
            <h1>{correct.toString().concat("/").concat(total)}</h1>
            <button
              className="btn btn-success mt-2"
              type="button"
              onClick={restartGame}
            >
              Play Again &nbsp;
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-arrow-repeat"
                viewBox="0 0 16 16"
              >
                <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z" />
                <path
                  d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"
                />
              </svg>
            </button>
            <ul className="list-group mt-5">
              {summary.map((items, index) => {
                return (
                  <li
                    key={
                      index +
                      items.status +
                      items.myAnswer +
                      items.correctAnswer
                    }
                    className={getItemClass(items.status)}
                    dangerouslySetInnerHTML={{
                      __html: "".concat(index + 1).concat(". ").concat(items.myAnswer)
                    }}
                  />
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Result;
