import React, {Component} from 'react';
import classes from './Quiz.module.scss'
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";
import axios from "../../axios/axios-quiz";
import Loader from "../../components/UI/Loader/Loader";

class Quiz extends Component {
    state = {
        loading:true,
        results:{}, // { [id]: 'success' || 'error' }
        activeQuestion: 0,
        isFinish: false,
        answerState: null, // { [id]: 'success' || 'error' }
        quiz: []
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

    async componentDidMount() {
        try {
            const response = await axios.get(`/quizes/${this.props.match.params.id}.json`)
            const quiz = response.data
            console.log(quiz)
            this.setState({
                quiz,
                loading: false
            })
        } catch (e) {
            console.log(e)
        }
    }

    render() {
        return (
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>

                    { this.state.loading?
                        <Loader/>:
                        this.state.isFinish ?
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