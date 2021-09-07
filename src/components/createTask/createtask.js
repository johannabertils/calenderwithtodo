import React from 'react';

class CreateTask extends React.Component {
    state = {
        inputText: this.props.inputText,
    }

    onChange = (evt) => {
        console.log("ändring skett");
        this.setState({ inputText: evt.target.value })
    }

    onSubmit = (evt) => {
        evt.preventDefault();
        console.log("sparat");
        this.props.newTask(this.state.inputText); 
    }

    render() {
        return (
            <div>
                <h1>Create new task</h1>
                <p>Creates task on selected day</p>
                <form onSubmit= {this.onSubmit}>
                    <input type="text" value={this.state.inputText} onChange={this.onChange} />
                    <button type="submit">Spara</button>
                </form>
            </div>
        );
    }
}


export default CreateTask; 