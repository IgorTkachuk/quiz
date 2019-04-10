import React, {Component} from "react"
import Button from './styled-component/Button'

export default class App extends Component {

  state = {
    questions: [
      {
        title: "Вопрос 1",
        variants: [
          "Ответ 1 на вопрос 1",
          "Ответ 2 на вопрос 1",
          "Ответ 3 на вопрос 1",
        ],
        answer: [2]
      },
      {
        title: "Вопрос 2",
        variants: [
          "Ответ 1 на вопрос 2",
          "Ответ 2 на вопрос 2",
          "Ответ 3 на вопрос 2",
        ],
        answer: [1]
      }
    ],
    currentQuestion: 0,
    answers: [],
    answered: false,
    quizIsFinished: false,
    showResult: false
  }

  questionCheck = (result) => {
    const {currentQuestion, questions} = this.state
    const quizIsFinished = currentQuestion === questions.length - 1

    this.setState((state) => {
      return {
        answers: [...state.answers, result],
        answered: !state.answered,
        quizIsFinished: quizIsFinished
      }
    })
  }

  next = () => {
    this.setState((state) => {
      return {
        answered: !state.answered,
        currentQuestion: Math.min(++state.currentQuestion, state.questions.length -1)
      }
    })
  }

  result = () => {
      this.setState({
        showResult: true
      })
  }

  render() {
    const { answered, questions, currentQuestion, quizIsFinished, answers, showResult } = this.state
    const question = questions[currentQuestion]

    return (
      <div>
        <p> <b>Quiz </b></p>
          { 
            !showResult ?
              <>
                <Question key={currentQuestion} question={question} questionCheck={this.questionCheck}/>
                { answered ? 
                    quizIsFinished ? <Button result="true" onClick={this.result}>Result</Button> : <Button onClick={this.next}>Next</Button> 
                  : null 
                }
              </>
            : <p>You answered correctly on <b>{countTruthly(answers)}</b> question(s) from <b>{questions.length}</b></p>
          }
      </div>
    )
  }
}

function equals (obj1, obj2) {
  return JSON.stringify(obj1) === JSON.stringify(obj2)
}

function switchAnswer (el, arr) {
  return arr.includes(el) ? arr.filter( x => x!==el) : [...arr, el].sort()
}

function countTruthly(arr) {
  return arr.filter(Boolean).length
}

class Question extends Component {
  state = {
    selectedAnswers: [],
    answered: false,
    answerIsCorrect: false
  }

  variantSwitch = (index) => {
    this.setState((state) => {
      return {
        selectedAnswers: switchAnswer(index, state.selectedAnswers)
      }
    })
  }

  check = () => {
    const { answer } = this.props.question
    const { selectedAnswers } = this.state
    const answerIsCorrect = equals(answer, selectedAnswers)

    this.setState((state) => ({
      answered: !state.answered,
      answerIsCorrect: answerIsCorrect
    }))

    return answerIsCorrect
  }

  render() {
    const {question, questionCheck} = this.props
    const {answered, answerIsCorrect, selectedAnswers} = this.state

    return (
      <div>
        <p>{question.title}</p>
        <hr/>
        <ol>
          { question.variants.map( (variant, index) =>
            <li key={index}>
              <input type="checkbox" id={`variant-${index}`} onClick={ _ => this.variantSwitch(index)} disabled={answered} />
              <label htmlFor={`variant-${index}`}>{variant}</label>
            </li>
            )
          }
        </ol>
        {
          !answered ? <Button  disabled={!selectedAnswers.length} onClick={_ => questionCheck(this.check())}>Submit</Button>
                    : (answerIsCorrect ? <p style={{color: 'green'}}>Answer is correct</p> : <p style={{color: 'red'}}>Answer isn't correct. Right answer is # { parseInt(question.answer) + 1 } </p>)
        }
      </div>
    )
  }
}