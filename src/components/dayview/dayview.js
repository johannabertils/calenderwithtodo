import React, { useState, useEffect } from 'react';

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

    function showTasksOfSelectedDate(clickedOnDate) {
        console.log("hej" + clickedOnDate);
        let getDataFromLocalStorage = localStorage.getItem('data');
        let parseTasks = JSON.parse(getDataFromLocalStorage)

        
        console.log("hej" + parseTasks);
        setLocalA(parseTasks);
        let writeText = parseTasks.map(function (item) {
            if (item.date === clickedOnDate) {
                console.log("yes");
                return <div><p> {item.date} {item.task} <button> Mark as done</button></p></div>;
            } 
        });
        setlistText(writeText)
    }

    return <div><h1><p>What to do on</p>{selectedDateValue}</h1><p>{list}</p></div>;

}