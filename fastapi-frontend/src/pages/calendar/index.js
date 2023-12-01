import {React, useState} from 'react'
import {Calendar, Views, momentLocalizer, Day, Week} from 'react-big-calendar'
import moment from 'moment'
import Navbar from '@/components/navbar';
import Footer from '@/components/Footer';
import 'react-big-calendar/lib/css/react-big-calendar.css'
import styles from '@/styles/global.module.css';

function DailyCalendar() {
  const localizer = momentLocalizer(moment)
  const allowedViews = ['MONTH', 'WEEK', 'DAY'];
  let allViews = Object.keys(Views).filter((k) => allowedViews.includes(k)).map((k)=> Views[k])

  const [events, setEvents] = useState([])

  return (
    <>
    <div id={styles.page} style={{ minHeight: '100vh' }}>
    <div className='container my-5'>
      <div className='row'>
        <Navbar />
      </div>
      <div className='row mt-5'>
        <div className='col'>
          <div id={styles.calendar}>
              <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              views={allViews}
              />
          </div>
        </div>
      </div>
    </div>
    </div>
    <Footer />
    </>
  )
}

export default DailyCalendar