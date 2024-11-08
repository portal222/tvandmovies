import React from "react";

const Time = () => {

    var tоday = new Date;
    var day = tоday.getDay();
    var dayInMonth = tоday.getDate();
    var month = tоday.getMonth() + 1;
    var year = tоday.getFullYear();

    if (day == 1) {
        day = "Мonday";
    } else if (day == 2) {
        day = "Tuesday"
    } else if (day == 3) {
        day = "Wednesday"
    } else if (day == 4) {
        day = "Thursday"
    } else if (day == 5) {
        day = "Friday"
    } else if (day == 6) {
        day = "Saturday"
    } else if (day == 7) {
        day = "Sunday"
    }

    if (dayInMonth < 10) {
        dayInMonth = "0" + dayInMonth
    }

    if (month < 10) {
        month = "0" + month
    }

    return (
        <>
            {day + " " + dayInMonth + "." + month + "." + year}
        </>
    )

}
export default Time;