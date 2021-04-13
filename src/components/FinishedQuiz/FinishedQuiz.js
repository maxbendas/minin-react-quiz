import React from 'react';
import classes from './FinishedQuiz.module.scss'

const FinishedQuiz = () => {
    return (
        <div className={classes.FinishedQuiz}>
            <ul>
                <li>
                    <strong>1. </strong>
                    how are you
                    <i className={'fa fa-times ' + classes.error}></i>
                </li>
                <li>
                    <strong>2. </strong>
                    how are you
                    <i className={'fa fa-check ' + classes.success}></i>
                </li>
            </ul>
            <p>Correctly 4 of 10</p>
            <div>
                <button>
                    Replay
                </button>
            </div>
        </div>
    );
};

export default FinishedQuiz;