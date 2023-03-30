import "./GameOver.css";
import iconSet from "../data/selection.json";
import IcomoonReact from "icomoon-react";

let valueDisplays = document.querySelectorAll(".final-score__number");
let interval = 1000;
valueDisplays.forEach((valueDisplay) => {
  let startValue = 0;
  let endValue = parseInt(valueDisplay.getAttribute("data-val"));
  let duration = Math.floor(interval / endValue);
  let counter = setInterval(function () {
    startValue += 5;
    valueDisplay.textContent = startValue;
    if (startValue === endValue) {
      clearInterval(counter);
    }
  }, duration);
});

const GameOver = ({ retry, score }) => {
  return (
    <div className="over">
      <div className="game-title">
        <span className="word__1st">Game</span>
        <span className="word__2nd">Over</span>
      </div>{" "}
      <div className="final-score">
        <span className="final-score__text">
          {score < 100 ? (
            <IcomoonReact
              iconSet={iconSet}
              color="#fff"
              size={100}
              icon="sad2"
              className="icon-sad"
              // onMouseOver={({ target }) => {
              //   console.log((target.style.fill = "#fff"));
              // }}
              // onMouseOut={({ target }) =>
              //   (target.style.fill = target.style.color = "#444")
              // }
            />
          ) : (
            <IcomoonReact
              iconSet={iconSet}
              color="#fff"
              size={100}
              icon="wink2"
              className="icon-happy"
            />
          )}
        </span>
      </div>
      <div className="box-score-retry">
        <span className="final-score__number" data-val={score}>
          Score: {score}
        </span>
        <button onClick={retry} className="btn-play retry">
          Retry
        </button>
      </div>
    </div>
  );
};

export default GameOver;
