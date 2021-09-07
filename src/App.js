import React, { useState, useEffect } from 'react';
import Calendar from './components/Calendar/calendar'
import CreateTask from './components/createTask/createtask'
import DayView from './components/dayview/dayview'
import ToDoList from './components/Todolist/todolist'
import './style.css'

export default function App() {

    const [selectedDate, setDate] = useState();
    const [task, setTask] = useState();
    const [array, setArray] = useState();
    // const [data, setData] = useState(0);

    // Get value of inputtext from createTask.js & change it
    const getSelectedDate = (date) => {
        console.log(date);
        setDate(date);
        console.log(selectedDate);
    }

    const saveNewTask = (getTask) => {
        console.log(getTask);
        setTask(getTask);
        console.log("hejsan" + task)
        CreateArray(getTask);
    }

    // activate createArray function
    // useEffect(() => {
    //     CreateArray();
    // }, [task]);

    const CreateArray = (getTask) => {
        const taskDate = selectedDate;
        const tasktodo = getTask;
        const key = Math.random();
        console.log(key);
        console.log(taskDate);

        const myArray = {
            id: key,
            date: taskDate,
            task: tasktodo,
            completed: false
        }
        console.log(myArray);
        console.log(myArray.id);
        setArray(myArray)
        console.log(array);
    }

// localstorage
    // useEffect(() => {
    //     const getTasks = localStorage.getItem('data')
    //     if (getTasks) {
    //         setArray(JSON.parse(getTasks));
    //         console.log(getTasks);
    //     } else {
    //         localStorage.setItem('data', "[]")
    //         console.log("no tasks");
    //     }
    // }, []);

    // check if localstorage has value, if it does push array into the array
    useEffect(() => {
        if (array != null){
        let newArray; 
        if (!localStorage ['data']) newArray = [];
        else newArray = JSON.parse(localStorage['data']);
        localStorage.clear();
        newArray.push(array);
        console.log("kör");
        localStorage.setItem('data', JSON.stringify(newArray));
    }
    }, [array]);

    return (
        <div className="main">
            <div className="calendar"> <Calendar selectedDate={getSelectedDate} /></div>
            <div className="Day"><CreateTask inputText={task} newTask={saveNewTask} /></div>
            <div className="ToDoList"><ToDoList /></div>
            <div className="DayView"><DayView /></div>
        </div>
    )
}