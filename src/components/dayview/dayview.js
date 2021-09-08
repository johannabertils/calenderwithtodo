import React, { useState, useEffect } from 'react';
import './dayview.css';

export default function Dayview({ selectedDateValue }) {

    const [clickedOnDate, setclickedOnDate] = useState();
    const [LocalA, setLocalA] = useState();
    const [listText, setlistText] = useState();

    const list = <div>{listText}</div>;

    useEffect(() => {
        setclickedOnDate(selectedDateValue);
    }, [selectedDateValue]);

    useEffect(() => {
        let dataFromLocalStorage = localStorage.getItem('data');
        if (dataFromLocalStorage === null) {
           console.log("no data");
        } else {
            showTasksOfSelectedDate(clickedOnDate); 
        }

    }, [clickedOnDate]);

     // when clicking on mark as done button
     function done(item) {
        console.log("click" + item.id);
        let id = item.id;
        removeItem(id);
    }

    function removeItem(id) {
        let getDataFromLocalStorage = localStorage.getItem('data');
        let oldArray = JSON.parse(getDataFromLocalStorage)

        let newArray = oldArray.map(function (item) {
            if (item.id === id) {
             item.completed = true; 
            } 
            return item;
        });

        setLocalA(newArray)
        localStorage.clear();
        localStorage.setItem('data', JSON.stringify(newArray));
        showTasksOfSelectedDate(clickedOnDate);
    }

    function showTasksOfSelectedDate(clickedOnDate) {
        console.log("hej" + clickedOnDate);
        let getDataFromLocalStorage = localStorage.getItem('data');
        let parseTasks = JSON.parse(getDataFromLocalStorage)
        
        console.log("hej" + parseTasks);
        setLocalA(parseTasks);
        let writeText = parseTasks.map(function (item) {
            if (item.date === clickedOnDate && item.completed === false) {
                console.log("yes");
                return <div className="dayviewList"><p> {item.date} {item.task} <button onClick={() => done(item)}> Mark as done</button></p></div>;
            } 
        });
        setlistText(writeText)
    }


    return <div><h1><p>What to do on</p>{selectedDateValue}</h1><p>{list}</p></div>;

}