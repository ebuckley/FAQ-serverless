import React from 'react'
export default function Register({ onChange, onRegister }) {
    return (<div className="content">
        <p>
            This is an application for asking important questions
        </p>
        <p>First, let us know what your name is.</p>
        <input onChange={(e) => onChange(e)} placeholder="name"></input>
        <button onClick={() => onRegister()}>View FAQs</button>
    </div>)
}