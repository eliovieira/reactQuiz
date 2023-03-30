import "./StartScreen.css";

const StartScreen = ({ startGame }) => {
  return (
    <div className="start">
      <div className="game-title">
        <span className="word__1st">React </span>
        <span className="word__2nd">Quiz</span>
      </div>{" "}
      <button onClick={startGame} className="btn-play">
        {" "}
        <span className="btn-text"> Let's Play</span>
      </button>
    </div>
  );
};

export default StartScreen;
