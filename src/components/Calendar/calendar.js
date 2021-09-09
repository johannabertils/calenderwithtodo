import React, { useState, useEffect } from 'react';
import moment from 'moment';
import './calendar.css';

// creates days, per week per month
export default function Calendar({ selectedDate }) {


    const [calendar, setCalendar] = useState([]);
    const [m, setM] = useState(moment());
    const [text, setText] = useState("no tasks");
    const [array, setArray] = useState();



    const Text = () => <div>{text}</div>;

    function checkLocalStorage(day) {
        let getDataFromLocalStorage = localStorage.getItem('data');
        let data = JSON.parse(getDataFromLocalStorage)
        let getday = day.format("MM/DD/YYYY")
        console.log("hej");

        if (getDataFromLocalStorage === null) {
            console.log("no data");
        } else {
            let countOccurences =
            data.filter(function (value) {
                return value.date === getday;
            }).length

            // if (countOccurences > 0) {
            //     console.log(getday + "has" + countOccurences + "tasks");
            // }

            return (
                countOccurences
            )
        }
    }

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

    function previousMonth() {
        return m.clone().subtract(1, "month")
    }

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
                                <div className={m.isSame(day, "day") ? "selected" : ""} key={checkLocalStorage(day)}> {day.format("D").toString()}{}
                                    <p className="countedTasks"> {text}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                ))}
            </div>
            </div>)



    function targetedDay(day, id) {
        console.log(id);
        let taskDay = day.format("MM/DD/YYYY").toString();
        selectedDate(taskDay);
        console.log("day" + day.value);
    }

}