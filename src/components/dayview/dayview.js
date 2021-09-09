import React, { useState, useEffect } from 'react';
import './dayview.css';

export default function Dayview({ selectedDateValue }) {

    const [clickedOnDate, setclickedOnDate] = useState(0);
    const [LocalA, setLocalA] = useState();
    const [listText, setlistText] = useState();
    const [nummberText, setnumberText] = useState();

    const list = <p>{listText}</p>;
    const occurrences = <p>{nummberText}</p>;

    useEffect(() => {
        setclickedOnDate(selectedDateValue);
    }, [selectedDateValue]);

    useEffect(() => {
        let dataFromLocalStorage = localStorage.getItem('data');
        if (dataFromLocalStorage === null) {
            console.log("no data");
            let nomatch = <p>You have no tasks!</p>
            setnumberText(nomatch)

        } else {
            showTasksOfSelectedDate(clickedOnDate);
        }

    }, [clickedOnDate]);

    // when clicking on mark as done button
    function done(item) {

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
        let getDataFromLocalStorage = localStorage.getItem('data');
        let parseTasks = JSON.parse(getDataFromLocalStorage)
        setLocalA(parseTasks);

        let countOccurences =
            parseTasks.filter(function (value) {
                return value.date === clickedOnDate;
            }).length 

            if (countOccurences > 0){
        setnumberText(<p>You have {countOccurences} tasks this day</p>)
    }

        let matchfound = "";
        let writeText = parseTasks.map(function (item) {
            if (item.date === clickedOnDate && item.completed === false) {
                matchfound = true;

                return <div className="dayviewList"><p> {item.task} <button onClick={() => done(item)}> Mark as done</button></p></div>;
            }
        });
        setlistText(writeText)
        if (!matchfound && clickedOnDate != undefined){
            let nomatch = <p>You have no tasks to do this day!</p>
            setnumberText(nomatch)
        }
    }


    return <div><h2>{selectedDateValue}</h2><p>{occurrences}</p><p>{list}</p></div>;

}