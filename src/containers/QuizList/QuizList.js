import React, {Component} from 'react';
import classes from './QuizList.module.scss'
import {NavLink} from "react-router-dom";
import axios from "../../axios/axios-quiz";
import Loader from "../../components/UI/Loader/Loader";

class QuizList extends Component {
    state = {
        quizes: [],
        loading: true
    }
    renderQuizes = () => {
        return this.state.quizes.map(quiz => {
            return (
                <li key={quiz.id}>
                    <NavLink to={'/quiz/' + quiz.id}>
                        {quiz.name}
                    </NavLink>
                </li>
            )
        })
    }

    async componentDidMount() {
        const quizes = []
        try {
            const response = await axios.get('/quizes.json')
            Object.keys(response.data).forEach((key, index) => {
                quizes.push({
                    id: key,
                    name: 'Test ' + (index + 1)
                })
            })

            this.setState({
                quizes,
                loading: false
            })
        } catch (e) {
            console.log(e)
        }
    }

    render() {
        return (
            <div className={classes.QuizList}>
                <div>
                    <h1>Quiz List</h1>
                    {
                        this.state.loading ?
                            <Loader/> :
                            <ul>
                                {this.renderQuizes()}
                            </ul>
                    }

                </div>
            </div>
        );
    }
}

export default QuizList;