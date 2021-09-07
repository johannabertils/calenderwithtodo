import React, { useState, useEffect } from 'react';
import Calendar from './components/Calendar/calendar'
import CreateTask from './components/createTask/createtask'
import DayView from './components/dayview/dayview'
import ToDoList from './components/Todolist/todolist'
import './style.css'

export default function App() {

    const [selectedDate, setDate] = useState(0);
    const [task, setTask] = useState(0);
    const [array, setArray] = useState(0);
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
        console.log(task)
    }

    // activate createArray function
    useEffect(() => {
        CreateArray();
    }, [task]);

    const CreateArray = () => {
        const taskDate = selectedDate;
        const tasktodo = task;
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
        // if (citiesArray.includes(myArray.id)) {
        //     console.log("property already exists");
        //   } else {
        //     citiesArray.push(cityId);
        //   }
    }

    useEffect(() => {
        const getTasks = localStorage.getItem('data')
        if (getTasks) {
            setArray(JSON.parse(getTasks));
            console.log(getTasks);
        } else {
            console.log("no tasks");
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('data', JSON.stringify(array));
    }, [array]);

    // useEffect(() => {
    //     localStorage.setItem('data', JSON.stringify(array));
    // }, [array]);

    return (
        <div className="main">
            <div className="calendar"> <Calendar selectedDate={getSelectedDate} /></div>
            <div className="Day"><CreateTask inputText={task} newTask={saveNewTask} /></div>
            <div className="ToDoList"><ToDoList /></div>
            <div className="DayView"><DayView /></div>
        </div>
    )
}