import React, { useState, useEffect } from 'react';
import './todolist.css';


export default function ToDoList() {


    const [showList, setShowList] = useState(false);
    const [text, setText] = useState();

    // set text that will show on click to the state text
    const Text = () => <div>{text}</div>;

    // when clicking on showlist btn -> if value in localstorage acitvate printList function
    function showItemsOnClick(evt, Text) {
        console.log(localStorage.data);
        evt.preventDefault();
        setShowList(true);
        console.log("hello there");
        var dataFromLocalStorage = localStorage.getItem('data');
        if (dataFromLocalStorage === null) {
            setText("No tasks")
            console.log("no tasks");
        } else {
            printList(dataFromLocalStorage);
        }
    }

    // Print tasklist

    const printList = (dataFromLocalStorage) => {
        var getTasks = JSON.parse(dataFromLocalStorage);
        var dates = getTasks.map(item =>
            <div className="itemList">
                <p className="taskname"> {item.date} {item.task}
                    <button>Mark as done</button></p></div>)
        setText(dates)
        // const myArrayTasks = movies2;
        console.log("my array är" + dates);
    }



    return <div>
        <h1>To do list</h1>
        <button onClick={showItemsOnClick}>Show the to do list</button>
        {showList ? <Text /> : null}
    </div>;

}

