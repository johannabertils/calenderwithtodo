import React, { useState, useEffect } from 'react';
import Calendar from './components/Calendar/calendar'
import CreateTask from './components/createTask/createtask'
import DayView from './components/dayview/dayview'
import ToDoList from './components/Todolist/todolist'
import './style.css'

export default function App() {

    // states
    const [selectedDate, setDate] = useState();
    const [task, setTask] = useState();
    const [array, setArray] = useState();
    const [error, seterror] = useState();
    const [status, setStatus] = useState("hej");
    const [listUpdated, setListUpdated] = useState(false);

    // error message if no date
    const nodate = <div>{error}</div>;

    // Get value of date from calendar and update selectedDate with setDate 
    const getSelectedDate = (date) => {
        setDate(date);
    }

    // Get value of inputtext from createTask.js & setTask to the value
    const saveNewTask = (getTask) => {
        setTask(getTask);
        CreateArray(getTask);
    }

    // create and array of information about task and push as array to a state
    const CreateArray = (getTask) => {
        const taskDate = selectedDate;
        const tasktodo = getTask;
        const key = Math.random();

        if (selectedDate == null) {
            let errorMsg = <div>No date has been selected</div>;
            seterror(errorMsg);
        } else {
            const myArray = {
                id: key,
                date: taskDate,
                task: tasktodo,
                completed: false
            }
            setArray(myArray)
        }
    }

    // check if localstorage has value, if it does push the array of information 
    // about taskinto into the array in localstorage or create array
    useEffect(() => {
        if (array != null) {
            let newArray;
            if (!localStorage['data']) newArray = [];
            else newArray = JSON.parse(localStorage['data']);
            localStorage.clear();
            newArray.push(array);
            localStorage.setItem('data', JSON.stringify(newArray));
            setListUpdated(array);
        }
    }, [array]);


    return (
        <div className="main">
            <div className="calendar"> <Calendar selectedDate={getSelectedDate} /></div>
            <div className="sideBar">
                <div className="DayView"><h1>Tasks</h1><DayView selectedDateValue={selectedDate} checkForUpdate={listUpdated} changeStatus={status => setStatus(status)} /></div><br />
                <div className="createtask"><CreateTask selectedDateValue={selectedDate} inputText={task} newTask={saveNewTask} />
                    <p>{nodate}</p></div><br />
                <div className="ToDoList">< ToDoList changeStatus={status => setStatus(status)} checkForUpdate={listUpdated} /></div>
            </div>

        </div>
    )
}

