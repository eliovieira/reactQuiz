// CSS
import "./App.css";

// REACT
import { useCallback, useEffect, useState } from "react";

// data
import { wordsList } from "./data/words";

// components
import StartScreen from "./components/StartScreen";
import Game from "./components/Game";
import GameOver from "./components/GameOver";

const stages = [
  { id: 1, name: "start" },
  { id: 2, name: "game" },
  { id: 3, name: "end" },
];

function App() {
  // começar no stage "start"
  const [gameStage, setGameStage] = useState(stages[0].name);
  // importa as palavras/categorias
  const [words] = useState(wordsList);
  // categoria escolhida de forma aleatoria
  const [pickedCategory, setPickedCategory] = useState("");
  // palavra que está dentro de 1 categoria escolhida de forma aleatoria
  const [pickedWord, setPickedWord] = useState("");
  // array das letras que constituem a palavra
  const [letters, setLetters] = useState([]);
  //array das letras escolhidas pelo utilizador que existem na palavra
  const [guessedLetters, setGuessedLetters] = useState([]);
  //array das letras escolhidas pelo utilizador que não existem na palavra
  const [wrongLetters, setWrongLetters] = useState([]);
  // score do utilizador
  const [score, setScore] = useState(0);
  // letra escolhida pelo utilizador
  const [letterX, setLetterX] = useState("");
  //numero de tentativas disponiveis
  const [tentativas, setTentativas] = useState(3);
  const [numQuestion, setNumQuestion] = useState(0);
  const [shuffledQuestionsAnswers, setShuffledQuestionsAnswers] = useState([]);

  useEffect(() => {
    function shuffle(arr) {
      var ar = [...arr];
      var newAr = [];
      while (ar.length) {
        var rindex = Math.floor(Math.random() * ar.length);
        var item = ar.splice(rindex, 1)[0];
        newAr.push(item);
      }
      return newAr;
    }
    setShuffledQuestionsAnswers(shuffle(Object.entries(words)));
  }, [words]);

  const pickQuestionAnswer = () => {
    const question = shuffledQuestionsAnswers[numQuestion][0];
    const answer = String(shuffledQuestionsAnswers[numQuestion][1]);
    const answerLetters = answer.toLowerCase().split("");

    setPickedWord(answer);
    setPickedCategory(question);
    setLetters(answerLetters);
    setNumQuestion(numQuestion + 1);
  };

  // altera para a página de "jogo"
  const startGame = useCallback(() => {
    //clear all letters
    setGuessedLetters([]);
    setWrongLetters([]);

    // pick word/category
    pickQuestionAnswer();
    setGameStage(stages[1].name);
  }, [pickQuestionAnswer]);

  // altera para a página de "game over"
  const verifyLetter = (letterX) => {
    const normalizedLetter = letterX.toLowerCase();

    //verifica se a letra já foi inserida antes, caso tenha sido, não executa
    if (
      guessedLetters.includes(normalizedLetter) ||
      wrongLetters.includes(normalizedLetter)
    ) {
      console.log("JÁ USOU ESTA LETRA");
      return;
    }

    //verifica se a palavra tem a letra inserida e caso tenha, adiciona a letra ao array das letras certas, senão adiciona ao array das letras erradas
    if (letters.includes(normalizedLetter)) {
      guessedLetters.push(normalizedLetter);
      setGuessedLetters(guessedLetters);
      //console.log(guessedLetters);
    } else {
      wrongLetters.push(normalizedLetter);
      setWrongLetters(wrongLetters);
      setTentativas(tentativas - 1);
      //console.log(wrongLetters);

      if (wrongLetters.length === 2) {
        document.getElementById("numberTry").classList.add("lastTry");
      }
    }
  };

  //verifica se
  useEffect(() => {
    if (tentativas <= 0 || numQuestion === 10) {
      setGuessedLetters([]);
      setWrongLetters([]);
      setGameStage(stages[2].name);
    }
  }, [tentativas, numQuestion]);

  // //verifica a condição de vitoria
  useEffect(() => {
    const uniqueLetters = [...new Set(letters)];

    if (
      uniqueLetters.length === guessedLetters.length &&
      gameStage === stages[1].name
    ) {
      setScore(score + 100);
      console.log("ACERTOU");
      startGame();
    }
  }, [guessedLetters, letters, gameStage, score, startGame]);

  // altera para a página inicial "start"
  const retry = () => {
    setTentativas(3);
    setScore(0);
    setGameStage(stages[0].name);
  };

  return (
    <div className="App">
      {gameStage === "start" && <StartScreen startGame={startGame} />}
      {gameStage === "game" && (
        <Game
          verifyLetter={verifyLetter}
          word={pickedWord}
          category={pickedCategory}
          letters={letters}
          wrongLetters={wrongLetters}
          setWrongLetters={setWrongLetters}
          score={score}
          setScore={setScore}
          letterX={letterX}
          setLetterX={setLetterX}
          tentativas={tentativas}
          setTentativas={setTentativas}
          guessedLetters={guessedLetters}
          setGuessedLetters={setGuessedLetters}
          numQuestion={numQuestion}
        />
      )}
      {gameStage === "end" && <GameOver retry={retry} score={score} />}
    </div>
  );
}

export default App;
