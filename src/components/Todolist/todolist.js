import React, { useState } from 'react';
import './todolist.css';

export default function ToDoList() {
    const [showList, setShowList] = useState(false);
    const [showC, setshowC] = useState(false);
    const [completed, setCompleted] = useState();
    const [text, setText] = useState();

    // set text that will show when clicking on btn
    const Text = () => <p>{text}</p>;
    const CompletedText = () => <p>{completed}</p>;

    // when clicking on showlist btn -> if value in localstorage acitvate printList function
    function showItemsOnClick(evt) {
        evt.preventDefault();
        setshowC(false);
        setShowList(true);
        let dataFromLocalStorage = localStorage.getItem('data');
        if (dataFromLocalStorage === null) {
            let noTasks = <p className="notaskview"> You have no tasks to do! </p>;
            setText(noTasks)
        } else {
            printList();
        }
    }

    function showCompletedTasks(evt) {
        evt.preventDefault();
        console.log("click");
        setShowList(false);
        setshowC(true);

        let dataFromLocalStorage = localStorage.getItem('data');
        if (dataFromLocalStorage === null) {
            let noCompleted = "No finished tasks yet!";
            setCompleted(noCompleted)
        } else {
            showFinishedTasks();
        }
    }

    function showFinishedTasks() {
        let data = localStorage.getItem('data');
        let parsedData = JSON.parse(data);
        let foundincomplitedTasks = false;
        let showTasks = parsedData
            .map(item => {
                if (item.completed === true) {
                    foundincomplitedTasks = true;
                    return <div className="itemList">
                        <p className="taskname"> {item.date}  {item.task}
                            <button className="donebtn">Task is done</button></p></div>
                }
            })
        setCompleted(showTasks)

        if (foundincomplitedTasks === false) {
            let noCompletedTasks = <div className="taskname"> <p className="notasksmessage">You have no completed tasks!</p> </div>;
            setCompleted(noCompletedTasks)
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
        <button className="showlistbtn" onClick={showItemsOnClick}>Show all tasks</button>
        <button className="showlistbtn" onClick={showCompletedTasks}>Show completed tasks</button>
        {showList ? <Text /> : null}
        {showC ? <CompletedText /> : null}
    </div>;

}

