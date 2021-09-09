import React, { useState, useEffect } from 'react';
import './todolist.css';

export default function ToDoList() {
    const [showList, setShowList] = useState(false);
    const [text, setText] = useState();
    const [button, setbutton] = useState("Show all tasks");

    // set text that will show when clicking on btn
    const Text = () => <p>{text}</p>;

    // when clicking on showlist btn -> if value in localstorage acitvate printList function
    function showItemsOnClick(evt) {
        evt.preventDefault();
        setShowList(true);
        let newButton = "Update list";
        setbutton(newButton)
        let dataFromLocalStorage = localStorage.getItem('data');
        if (dataFromLocalStorage === null) {
            let noTasks = <p className="notaskview"> You have no tasks to do! </p>;
            setText(noTasks)
        } else {
            printList();
        }
    }

    // when clicking on mark as done button
    function markAsDone(item) {
        let id = item.id;
        changeStatus(id);
        printList();
    }

    //  change status of task to completed = true
    function changeStatus(id) {
        let getDataFromLocalStorage = localStorage.getItem('data');
        let oldArray = JSON.parse(getDataFromLocalStorage)

        let newArray = oldArray.map(function (item) {
            if (item.id === id) {
                item.completed = true;
            }
            return item;
        });
        localStorage.clear();
        localStorage.setItem('data', JSON.stringify(newArray));
    }
    // Print list of tasks and sort by date
    const printList = () => {
        let data = localStorage.getItem('data');
        let parsedTasks = JSON.parse(data);
        let foundincomplite = false;

        let printArrayOfTasks = parsedTasks
            .sort((a, b) => a.date > b.date)
            .map(item => {
                if (item.completed === false) {
                    foundincomplite = true;
                    return <div className="itemList">
                        <p className="taskname"> {item.date}  {item.task}
                            <button className="donebtn" onClick={() => markAsDone(item)}> Mark as done</button></p></div>
                }
            })
        if (foundincomplite === false) {
            let noTasks = <div className="notaskview"> <p className="notasksmessage">You have no tasks to do!</p> </div>;
            printArrayOfTasks = noTasks;
        }
        setText(printArrayOfTasks)
    }

    return <div className="todolist">
        <button className="showlistbtn" onClick={showItemsOnClick}>{button}</button>
        {showList ? <Text /> : null}
    </div>;

}

