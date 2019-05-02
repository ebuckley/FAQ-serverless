import React from 'react';
import { distanceInWordsToNow, parse } from 'date-fns';

// <ViewQuestion id={match.params.id} list={list} />
function GetAnswer(answer) {
    const reactions = answer.reactions ? answer.reactions.length : 0;
    return (<div className="answer-item" key={answer.id}>
        {answer.answer}
        <div className="answer-summary">
            (+ {reactions})
        </div>
    </div>)
}

function AnswerQuestion(question, onBack, onSave, onChange) {
    return (<div className="content">
        <span className="question-header">
            {question.question}
        </span>
        <div className="form-wrap">
            <textarea onChange={(e) => onChange(e)} ></textarea>
            <button onClick={onBack}>DISCARD</button><button onClick={onSave}>SAVE</button>
        </div>
    </div>)
}
export default class ViewQuestion extends React.Component {
    state = {
        mode: 'viewing'
    }
    onSaveAnswer(answer) {
        if (this.props.onAnswer) {
            this.props.onAnswer({ questionId: this.props.question.id, answer });
        }
    }
    render() {

        if (!this.props.question) {
            return <div className="content loader">
                Fetching Question..
            </div>
        }

        if (this.state.mode === 'answering') {
            const setViewing = () => this.setState({ mode: 'viewing' })
            const save = () => this.onSaveAnswer(this.state.answerValue)
            const updateanswervalue = e => this.setState({ answerValue: e.nativeEvent.target.value })
            return AnswerQuestion(this.props.question, setViewing, save, updateanswervalue)
        }

        const relativeAgo = distanceInWordsToNow(parse(this.props.question.createdAt));
        return (<div className="content">
            <span className="question-header">
                {this.props.question.question}
            </span>
            <div className="summary">
                Posted {relativeAgo} ago. &nbsp; &nbsp;
                <a href="javascript:void()" onClick={() => this.setState({ mode: 'answering' })}>Submit Answer</a>
            </div>

            <div className="answer-box">
                {this.props.question.answers.map(GetAnswer)}
            </div>
            {/* <pre>{JSON.stringify(this.props.question, null, 4)}</pre> */}
        </div>)
    }
}