import React, {Component} from 'react';
import classes from './Quiz.module.scss'
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";

class Quiz extends Component {
    state = {
        results:{}, // { [id]: 'success' || 'error' }
        activeQuestion: 0,
        isFinish: false,
        answerState: null, // { [id]: 'success' || 'error' }
        quiz: [
            {
                question: 'What color the sky?',
                rightAnswerId: 1,
                id:1,
                answers: [
                    {text: 'Blue', id: 1},
                    {text: 'Red', id: 2},
                    {text: 'Black', id: 3},
                    {text: 'Green', id: 4}
                ]
            },
            {
                question: 'What color the sun?',
                rightAnswerId: 2,
                id:2,
                answers: [
                    {text: 'Blue', id: 1},
                    {text: 'Yellow', id: 2},
                    {text: 'Black', id: 3},
                    {text: 'Green', id: 4}
                ]
            }
        ]
    }

    onAnswerClickHandler = (answerId) => {
        if (this.state.answerState) {
            const key = Object.keys(this.state.answerState)[0]
            if (this.state.answerState[key] === 'success') {
                return
            }
        }
        const question = this.state.quiz[this.state.activeQuestion]
        const results = this.state.results

        if (question.rightAnswerId === answerId) {
            if (!results[question.id]){
                results[question.id] = 'success'
            }
            this.setState({
                answerState: {[answerId]: 'success'},
                results
            })
            const timeout = window.setTimeout(() => {
                if (this.isQuizFinished()) {
                    this.setState({isFinish:true})
                } else {
                    this.setState({
                        activeQuestion: this.state.activeQuestion + 1,
                        answerState: null
                    })
                }
                window.clearTimeout(timeout)
            }, 1000)
        } else {
            results[question.id] = 'error'
            this.setState({
                answerState: {[answerId]: 'error'},
                results
            })
        }
    }
    isQuizFinished = () => {
        return this.state.activeQuestion + 1 === this.state.quiz.length
    }

    retryHandler=()=>{
        this.setState({
            results:{},
            activeQuestion: 0,
            isFinish: false,
            answerState: null,
        })
    }

    render() {
        return (
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>

                    { this.state.isFinish ?
                        <FinishedQuiz
                            results={this.state.results}
                            quiz={this.state.quiz}
                            onRetry={this.retryHandler}
                        /> :
                        <>
                            <h1>Please answer all the questions</h1>
                            <ActiveQuiz
                                answers={this.state.quiz[this.state.activeQuestion].answers}
                                question={this.state.quiz[this.state.activeQuestion].question}
                                onAnswerClick={this.onAnswerClickHandler}
                                activeQuestion={this.state.activeQuestion + 1}
                                quizLength={this.state.quiz.length}
                                state={this.state.answerState}
                            />
                        </>
                    }
                </div>
            </div>
        );
    }
}

export default Quiz;