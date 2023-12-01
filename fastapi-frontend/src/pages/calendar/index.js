import React from 'react'
import {Calendar, momentLocalizer} from 'react-big-calendar'
import moment from 'moment'
import "react-big-calendar/lib/css/react-big-calendar.css";
import styles from '@/styles/global.module.css';

function DailyCalendar() {
  const localizer = momentLocalizer(moment)

  return (
    <div id={styles.calendar}>
        <Calendar
        localizer={localizer}
        events=""
        startAccessor="start"
        endAccessor="end"
         />
    </div>
  )
}

export default DailyCalendar