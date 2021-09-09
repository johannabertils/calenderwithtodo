import React, { useState, useEffect } from 'react';
import moment from 'moment';
import './calendar.css';

// creates days, per week per month
export default function Calendar({ selectedDate }) {

    const [calendar, setCalendar] = useState([]);
    const [m, setM] = useState(moment());

    // function that writes how many tasks there is each day in the calendar
    function getTaskCount(day) {
        let dataFromLocalStorage = localStorage.getItem('data');
        let data = JSON.parse(dataFromLocalStorage)
        let message =  "no tasks";

        if (data === null) {
           return message;
        } else {
            let getday = day.format("MM/DD/YYYY")
            let countOccurences =
                data.filter(function (value) {
                    if (value.completed === false) {
                        return value.date === getday;
                    }
                }).length

            switch (countOccurences) {
                case 0: return "no tasks";
                case 1: return "1 task";
                default: return countOccurences.toString() + " tasks";
            }
        }

    }

    // get days, month and year values
    useEffect(() => {
        const dayToBegin = m.clone().startOf("month").startOf("week");
        const dayToEnd = m.clone().endOf("month").endOf("weeks");
        const day = dayToBegin.clone().subtract(1, "day");
        const viewCalendar = [];

        while (day.isBefore(dayToEnd, "day")) {
            viewCalendar.push(
                Array(7)
                    .fill(0)
                    .map(() => day.add(1, "day").clone())
            );
        }
        setCalendar(viewCalendar);
    }, [m])

    // get current month
    function currentMonthName() {
        return m.format("MMMM")
    }

    // get current year
    function currentYear() {
        return m.format("YYYY")
    }

    // get previousmonth
    function previousMonth() {
        return m.clone().subtract(1, "month")
    }

    // get nextmonth
    function nextMonth() {
        return m.clone().add(1, "month")
    }

    // Print out the calander
    return (

        <div className="calendar">
            <div className="Calendarheader">
                <div className="arrowBack" onClick={() => setM(previousMonth())}>{String.fromCharCode(171)}</div>
                <div className="curentMonth">{currentMonthName()} {currentYear()}</div>
                <div className="arrowFront" onClick={() => setM(nextMonth())}>{String.fromCharCode(187)}</div>
            </div>

            <div className="days">
                <p>Sun</p>
                <p>Mon</p>
                <p>Tue</p>
                <p>Wed</p>
                <p>Thurs</p>
                <p>Fri</p>
                <p>Sat</p>

            </div>

            <div className="calendar">
                {calendar.map((week) => (
                    <div>
                        {week.map((day) => (
                            <div className="day" id={day}
                                onClick={() => { setM(day); targetedDay(day); }}>
                                <div className={m.isSame(day, "day") ? "selected" : ""} > {day.format("D").toString()}{}
                                    <p className="countedTasks"> {getTaskCount(day)}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                ))}
            </div>
        </div>)



    // get the clicked on day and set it in a state to send to parent
    function targetedDay(day, id) {
        let taskDay = day.format("MM/DD/YYYY").toString();
        selectedDate(taskDay);
    }
}