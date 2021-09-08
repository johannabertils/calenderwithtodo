import React, { useState } from 'react';
import moment from 'moment';
import './todolist.css';

export default function ToDoList() {
    const [showList, setShowList] = useState(false);
    const [text, setText] = useState();
    const [localStorageArray, setlocalStorageArray] = useState();

    // set text that will show on click to the state text
    const Text = () => <div>{text}</div>;

    // when clicking on showlist btn -> if value in localstorage acitvate printList function
    function showItemsOnClick(evt) {
        evt.preventDefault();
        setShowList(true);
        let dataFromLocalStorage = localStorage.getItem('data');
        if (dataFromLocalStorage === null) {
            let noTasks = <div className="notaskview"> <p className="notasksmessage">You have no tasks to do!</p> </div>;
            setText(noTasks)
        } else {
            printList(dataFromLocalStorage);
        }
    }

    // when clicking on mark as done button
    function markAsDone(item) {
        console.log("click" + item.id);
        let id = item.id;
        removeItem(id);
    }

    function removeItem(id, localStorageArray) {
        console.log("iD" + id);
        let hej = localStorageArray;
        console.log("DD" + hej);
        // setlocalStorageArray(localStorageArray.filter(item => item.id == id))
    }
    // Print list of tasks and sort by date
    const printList = (dataFromLocalStorage) => {
        let parsedTasks = JSON.parse(dataFromLocalStorage);
        setlocalStorageArray(parsedTasks)
        let printArrayOfTasks = parsedTasks
            .sort((a, b) => a.date > b.date)
            .map(item =>
                <div className="itemList">
                    <p className="taskname"> {item.date}  {item.task}
                        <button onClick={() => markAsDone(item)}> Mark as done</button></p></div>)

        setText(printArrayOfTasks)

    }

    return <div className="todolist">
        <button className="showlistbtn" onClick={showItemsOnClick}>Show the to-do-list</button>
        {showList ? <Text /> : null}
    </div>;

}

