import { React, useCallback, useEffect, useState } from "react";
import { useGlobalState } from "@/context/GlobalState";
import { Calendar, Views, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import Navbar from "@/components/navbar";
import Footer from "@/components/Footer";
import "react-big-calendar/lib/css/react-big-calendar.css";
import styles from "@/styles/global.module.css";
import CalendarService from "@/services/calendar.service";

function DailyCalendar() {
  const { state, dispatch } = useGlobalState();
  const [user_id, setUserId] = useState();
  const [user, setUserData] = useState({});

  // called when loaded, checks to see if we have a user
  useEffect(() => {
    let num = 0;
    if (state.user) {
      num = state.user.user_id;
    } else {
      // get from local, set the user_id to #
      const u = JSON.parse(localStorage.getItem("user"));
      num = u.user_id;
    }
    if (num == 0) {
      // redirect back to login
      router.push("../");
    } else {
      setUserId(num);
    }
  }, []);

  useEffect(() => {
    // check localstorage
    const getUser = async () => {
      let response = await CalendarService.getUserData(user_id);
      console.log(response);
      setUserData(response.data);
    };
    getUser() // make sure to catch any error
      .catch(console.error);
  }, [user_id]);

  const localizer = momentLocalizer(moment);
  const allowedViews = ["MONTH", "WEEK", "DAY"];
  let allViews = Object.keys(Views)
    .filter((k) => allowedViews.includes(k))
    .map((k) => Views[k]);

  const [view, setView] = useState(Views.DAY);
  const onView = useCallback((newView) => setView(newView), [setView]);

  const [events, setEvents] = useState([]);

  return (
    <>
      <div id={styles.page}>
        <div className="container my-5">
          {/* <div className="row"><Navbar /></div> */}
          {state.user ? (
            <>
              <div className="row">
                <p>Hello, {user.username}</p>
              </div>
            </>
          ) : (
            <></>
          )}

          <div className="row mt-5">
            <div className="col">
              <div id={styles.calendar}>
                <Calendar
                  localizer={localizer}
                  events={events}
                  startAccessor="start"
                  endAccessor="end"
                  views={allViews}
                  // defaultView={Views.DAY}
                  // onView={onView}
                  // view={view}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default DailyCalendar;
