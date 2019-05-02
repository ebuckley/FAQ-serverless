import React from 'react';



export default class AskQuestion extends React.Component {
    state = {}
    onChange(e) {
        this.setState({ value: e.nativeEvent.target.value })
    }
    onSave() {
        if (this.props.onSave) {
            this.props.onSave(this.state.value)
        }
    }
    render() {
        const save = () => this.onSave()
        return (
            <div className="content">
                Ask me anything. Literally. Just make sure to have a look through HOT and see if your question has already been answered..
        <div className="form-wrap">
                    <textarea onChange={(e) => this.onChange(e)} value={this.state.value}></textarea>
                    <button onClick={save}>SAVE</button>
                </div>
            </div>)
    }
}