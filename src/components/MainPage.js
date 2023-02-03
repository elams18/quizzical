import React from "react"

export default function MainPage(props){

    return (
        <main>
            <h1>Quizzical </h1>
            <h3>How much do you know about computers?</h3>
            <button onClick={props.startGame}>Start Quiz</button>
        </main>
    )
}