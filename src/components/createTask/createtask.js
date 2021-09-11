import React from 'react';
import './createtask.css';

class CreateTask extends React.Component {
    state = {
        inputText: this.props.inputText,
        date: this.props.selectedDateValue
    }

    onChange = (evt) => {
        this.setState({ inputText: evt.target.value })
    }

    onSubmit = (evt) => {
        evt.preventDefault();
        this.props.newTask(this.state.inputText);
        this.state.inputText = "";
    }

    render() {

        return (
            <div className="createTask">
                <h1>Create new task</h1>
                <p>Select a day and add your new task! </p>
                <form onSubmit={this.onSubmit}>
                    <input type="text" value={this.state.inputText} onChange={this.onChange} />
                    <button type="submit">Add</button>
                </form>
            </div>
        )
    };
}


export default CreateTask; 