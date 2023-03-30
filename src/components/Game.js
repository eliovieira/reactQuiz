import { useRef } from "react";
import "./Game.css";

const Game = ({
  verifyLetter,
  word,
  category,
  letters,
  wrongLetters,
  setWrongLetters,
  tentativas,
  setTentativas,
  letterX,
  setLetterX,
  score,
  setScore,
  guessedLetters,
  setGuessedLetters,
}) => {
  const letterInputRef = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    // se o utilizador ainda tiver tentativas para acertar na palavra
    if (tentativas > 0) {
      // processa a letra inserida pelo utilizador
      verifyLetter(letterX);
    }

    //limpa o input e seleciona automaticamente o mesmo para ser mais fácil a inserção de outras letras
    setLetterX("");
    letterInputRef.current.focus();
  };

  return (
    <div>
      <div className="header">
        {/* <div className="scoreText">Score : {score}</div> */}
        <span className="question-text">{category.toUpperCase()}</span>
        <div className="try-text">
          <span id="numberTry" className="numberTry">
            {tentativas}
          </span>{" "}
          attempt(s) left
        </div>
      </div>
      <div className="grid">
        {letters.map((letter, i) =>
          // <h1>{letter.toUpperCase()}</h1>
          guessedLetters.includes(letter) ? (
            <span key={i} className="square ">
              {letter.toUpperCase()}
            </span>
          ) : (
            <span key={i} className="square hidden"></span>
          )
        )}
      </div>
      <div className="pick-letter">
        <span className="pick-letter__title">Pick a letter</span>
        <form onSubmit={handleSubmit} className="form-letter">
          <input
            name="letterX"
            maxLength={1}
            onChange={(e) => setLetterX(e.target.value)}
            value={letterX}
            ref={letterInputRef}
            className="pick-letter__input"
            required
          />

          <button type="submit" required className="btn-play pick-letter__btn">
            Check
          </button>
        </form>
        {wrongLetters.length > 0 ? (
          <span className="wrongLetters__title">Letras erradas</span>
        ) : (
          ""
        )}

        <div className="wrongLettersContainer">
          {wrongLetters.map((letter, i) => (
            <span key={i} className="item">
              {letter}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Game;
