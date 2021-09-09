import React, { useState, useEffect } from 'react';
import './todolist.css';

export default function ToDoList() {
    const [showList, setShowList] = useState(false);
    const [text, setText] = useState();
    const [localStorageArray, setlocalStorageArray] = useState();
    const [button, setbutton] = useState("Show to-do-list");

   

    // set text that will show on click to the state text
    const Text = () => <div>{text}</div>;
    // const buttonText = () => button;

    // when clicking on showlist btn -> if value in localstorage acitvate printList function
    function showItemsOnClick(evt) {
        evt.preventDefault();
        setShowList(true);
        let newButton = "update do-to-list";
        setbutton(newButton)
        let dataFromLocalStorage = localStorage.getItem('data');
        if (dataFromLocalStorage === null) {
            let noTasks = <div className="notaskview"> <p className="notasksmessage">You have no tasks to do!</p> </div>;
            setText(noTasks)
        } else {
            printList();
        }
    }

    // when clicking on mark as done button
    function markAsDone(item) {
        console.log("click" + item.id);
        let id = item.id;
        removeItem(id);
        printList(); 
    }

    function removeItem(id) {
        let getDataFromLocalStorage = localStorage.getItem('data');
        let oldArray = JSON.parse(getDataFromLocalStorage)

        let newArray = oldArray .map(function (item) {
            if (item.id === id) {
             item.completed = true; 
            } 
            return item;
        });

        setlocalStorageArray(newArray)
        localStorage.clear();
        localStorage.setItem('data', JSON.stringify(newArray));
    }
    // Print list of tasks and sort by date
    const printList = () => {
        let data = localStorage.getItem('data');
        let parsedTasks = JSON.parse(data);
        setlocalStorageArray(parsedTasks)
        let foundincomplite = false;
        let printArrayOfTasks = parsedTasks
            .sort((a, b) => a.date > b.date)
            .map(item => {
                if (item.completed === false) {
                    foundincomplite = true;
                return <div className="itemList">
                    <p className="taskname"> {item.date}  {item.task}
                        <button className="donebtn" onClick={() => markAsDone(item)}> Mark as done</button></p></div>
                    } })
                    if (foundincomplite === false){
                        let noTasks = <div className="notaskview"> <p className="notasksmessage">You have no tasks to do!</p> </div>;
                    printArrayOfTasks=noTasks;
                    }
        setText(printArrayOfTasks)
    }

    return <div className="todolist">
        <button className="showlistbtn" onClick={showItemsOnClick}>{button}</button>
        {showList ? <Text /> : null} 
    </div>;

}

