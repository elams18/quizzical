import React from "react"
import "../index.css"
export default function Questions(props){
    const parser = new DOMParser();
    const decodedString = parser.parseFromString(`<!doctype html><body>${props.question.question}`, 'text/html').body.textContent;
    const choicesElements = props.choice.map((choice, ind) => 
        {
            const styles = {
                backgroundColor: "#F5F7FB"
            }
            if(props.answered){
                // at evaluation
                // if that is clicked or that is the correct answer 
                if(ind == props.question.isClicked || props.question.options[ind] === props.question.correct_answer){
                    styles.backgroundColor = "#94D7A2"
                }

                if(props.question.isClicked !==-1 && ind == props.question.isClicked && props.question.options[props.question.isClicked] !== props.question.correct_answer){
                    styles.backgroundColor = "#F8BCBC"
                }
            }
            else{
                if(ind == props.question.isClicked && props.question.isClicked !==-1){
                    styles.backgroundColor = "#D6DBF5"
                }
            }
            const parser = new DOMParser();
            const decodedChoice = parser.parseFromString(`<!doctype html><body>${choice}`, 'text/html').body.textContent;
            return (<ul 
                key={ind} 
                style={styles} 
                onClick={()=>{props.clicked(props.id, ind)}}>{decodedChoice}
            </ul>)
        }
    )
    return(
        <React.Fragment>
            <h2>{props.ind+1}. {decodedString}</h2>
            <li>
                {choicesElements}
            </li>
            <hr/>
        </React.Fragment>
    )
}