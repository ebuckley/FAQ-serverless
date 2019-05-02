import React from 'react';
import { distanceInWordsToNow, parse, compareDesc } from 'date-fns';
import { Link } from 'react-router-dom';

const QuestionItem = (question) => {
    const relativeAgo = distanceInWordsToNow(parse(question.updatedAt));
    return (<div className="question-item" key={question.id}>
        <div className="question-text">{question.question}</div>
        <div className="summary-line"> {relativeAgo} ago | <Link to={"/q/" + question.id}>{question.answers.length} answers</Link></div>
    </div>)
}

export default function HotList({ list }) {
    const compareQuestionDesc = (l, r) => compareDesc(l.updatedAt, r.updatedAt)
    return (<div className="content">
        {list.sort(compareQuestionDesc).map(QuestionItem)}
    </div>)
}