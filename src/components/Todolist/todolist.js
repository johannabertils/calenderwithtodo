import React, { useState, useEffect } from 'react';


export default function ToDoList() {

    const [taskList, setTaskList] = useState();
    const [showList, setShowList] = useState(false);
    const [text, setText] = useState();

    // set text that will show on click to the state text
    const Text = () => <div>{text}</div>; 

    // when clicking on showlist btn -> show tasks
    function showItemsOnClick(evt, Text) {
        console.log(localStorage.data);
        evt.preventDefault();
        setShowList(true); 
        console.log("hello there");
        var dataFromLocalStorage = localStorage.getItem('data');
        if (dataFromLocalStorage === null){
            setText("No tasks")
            console.log("no tasks");
        } else {
            var getTasks = JSON.parse(dataFromLocalStorage); 
            var dates = getTasks.map( item => item.task)
            setText(dates)
            // const myArrayTasks = movies2;
            console.log("my array är" + dates);
        }
    }


    return <div>
        <h1>To do list</h1>
        <button onClick={showItemsOnClick}>Show the to do list</button>
        {showList ? <Text /> : null}
    </div>;

}

