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

    // Get value of date from calendar and update selectedDate with setDate 

    const getSelectedDate = (date) => {
        // console.log(date);
        setDate(date);
        // console.log(selectedDate);
    }

 // Get value of inputtext from createTask.js & setTask to the value
    const saveNewTask = (getTask) => {
        // console.log(getTask);
        setTask(getTask);
        // console.log("hejsan" + task)
        CreateArray(getTask);
    }

    // create and array of information about task
    const CreateArray = (getTask) => {
        const taskDate = selectedDate;
        const tasktodo = getTask;
        const key = Math.random();
        // console.log(key);
        // console.log(taskDate);

        const myArray = {
            id: key,
            date: taskDate,
            task: tasktodo,
            completed: false
        }
        // console.log(myArray);
        // console.log(myArray.id);
        setArray(myArray)
        // console.log(array);
    }

    // check if localstorage has value, if it does push the array of information about taskinto into the array in localstorage
    useEffect(() => {
        if (array != null){
        let newArray; 
        if (!localStorage['data']) newArray = [];
        else newArray = JSON.parse(localStorage['data']);
        localStorage.clear();
        newArray.push(array);
        // console.log("kör");
        localStorage.setItem('data', JSON.stringify(newArray));
    }
    }, [array]);

    return (
        <div className="main">
            <div className="calendar"> <Calendar selectedDate={getSelectedDate} /></div>
            <div>
            <div className="createtask"><CreateTask inputText={task} newTask={saveNewTask} /></div>
            <div className="DayView"><DayView selectedDateValue = {selectedDate} /></div>
            <div className="ToDoList">< ToDoList /></div>
            </div>

        </div>
    )
}