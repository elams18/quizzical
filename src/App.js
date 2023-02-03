import { data } from "dcmjs";
import React, { useState } from "react";
import './App.css';
import MainPage from './components/MainPage';
import Question from "./components/Question"
import {nanoid} from "nanoid";
function App() {
  const [gameNo, setGameNo] = useState(1)
  const [gameStart, setGameStart] = React.useState(false);
  const [questions, setQuestions] = React.useState([]);
  const [answered, setAnswered] = React.useState(false);
  const [score, setScore] = React.useState(0);
  
  function startGame(){
    setGameStart(prev => !prev)
  }
  function playAgain(){
    setAnswered(false);
    setGameNo(prev => prev + 1)
  }
  function checkAnswers(){
    setAnswered(true);
    const correct = questions.filter(
      question => question.isClicked != -1 && question.options[question.isClicked] === question.correct_answer)
    setScore(correct.length)
    console.log(score, correct);
  }
  function clicked(id, index){
    setQuestions(prevQuestions=> prevQuestions.map((prevQ, ind) =>{
      return prevQ.id === id?
      {...prevQ, isClicked: index}
      :
      {...prevQ}
    }))
  }
  
  React.useEffect(()=>{
    fetch("https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple")
    .then((res)=>res.json())
    .then(data =>setQuestions(data.results.map(q => {
      let options = q.incorrect_answers;
      options.push(q.correct_answer);
      options = options.sort(() => {
          const randomTrueOrFalse = Math.random() > 0.5;
          return randomTrueOrFalse ? 1 : -1
        });
      return {
        ...q, 
        options: options,
        isClicked: -1, 
        id: nanoid()
      }
    })))
  }, [gameNo])
  
  const questionElements = questions.map((question, ind)=>{
    const choice = question.options;
    // if(choice.indexOf(question.correct_answer) === -1) {
    //   choice.push(question.correct_answer);
    // }
    // const shuffled = choice.sort(() => {
    //   const randomTrueOrFalse = Math.random() > 0.5;
    //   return randomTrueOrFalse ? 1 : -1
    // });
    return <Question 
            key={question.id} 
            id={question.id}
            ind={ind}
            clicked={clicked}
            question={question}
            answered={answered}
            choice={choice}/>
  })
  // console.log(questionElements);
  return (
    <div>
      {gameStart?
        <div className="question--list">
          {questionElements}
          {answered?
          <h3>
            You have scored {score}/{questions.length}.&nbsp; &nbsp; <span><button onClick={playAgain}>Play again</button></span>
          </h3>
          :<button onClick={checkAnswers}>Check Answers</button>}
        </div>
        :
        <MainPage 
          startGame={startGame}
        />}
    </div>
  );
}

export default App;
