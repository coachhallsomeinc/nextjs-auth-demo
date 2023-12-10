import { React, useCallback, useEffect, useState, useMemo } from "react";
import { useGlobalState } from "@/context/GlobalState";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";
import { Calendar, Views, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import Navbar from "@/components/navbar";
import Footer from "@/components/Footer";
import "react-big-calendar/lib/css/react-big-calendar.css";
import styles from "@/styles/global.module.css";
import GetUserService from "@/services/getuser.service";

function DailyCalendar() {
  const { state, dispatch } = useGlobalState();
  const [user_id, setUserId] = useState();
  const [user, setUserData] = useState(state.user);

  const localizer = momentLocalizer(moment);
  
  const [events, setEvents] = useState([]);
  const [eventType, setEventType] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleEventTypeClick = (selectedEventType) => {
    setEventType(selectedEventType);
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    switch (eventType) {
      case 'Medicine':
        setMedicineFormData((prevFormData) => ({
          ...prevFormData,
          [name]: value,
        }));
        break;
      case 'Symptom':
        setSymptomFormData((prevFormData) => ({
          ...prevFormData,
          [name]: value,
        }));
        break;
      case 'Other':
        setOtherFormData((prevFormData) => ({
          ...prevFormData,
          [name]: value,
        }));
        break;
      default:
        break;
    }
  };


  const [medicineFormData, setMedicineFormData] = useState({
    dose: '',
    medicineType: '',
    timeToNextDose: '',
    medicineDescription: '',
  })

  console.log(medicineFormData)
  console.log(eventType)

  const [symptomFormData, setSymptomFormData] = useState({
    symptomType: '',
    symptomSeverity: '',
    symptomDescription: '',
  });

  const [otherFormData, setOtherFormData] = useState({
    otherDescription: '',
  });

  const openModal = () => {
    setShowModal(true);
    setSelectedDate();
  }

  const submitModal = () => {
    setShowModal(false);
    setSelectedDate();
  }

  const closeModal = () => {
    setShowModal(false);
    switch (eventType) {
      case 'Medicine':
        setMedicineFormData({
          dose: '',
          medicineType: '',
          timeToNextDose: '',
          medicineDescription: '',
        });
        break;
      case 'Symptom':
        setSymptomFormData({
          symptomType: '',
          symptomSeverity: '',
          symptomDescription: '',
        });
        break;
      case 'Other':
        setOtherFormData({
          otherDescription: '',
        });
        break;
      default:
        break;
    }
    setEventType("")
    setSelectedDate();
  }

  const renderForm = () => {
    switch (eventType) {
      case 'Medicine':
        return (
          <div className="container mt-3">
            <div className="row">
              <div className="col-12 mt-1 border rounded-5 p-3">
              <p>Enter your Medicine event information</p>
              <form>
                <input
                  className="mt-2 bg-light fs-6 form-control form control-lg "
                  placeholder="Enter Dose Given"
                  type="text"
                  name="dose"
                  value={medicineFormData.dose}
                  onChange={(event) => handleInputChange(event, 'Medicine')}
                />
                <input
                  className="mt-2 bg-light fs-6 form-control form control-lg "
                  placeholder="Enter Medicine Type"
                  type="text"
                  name="medicineType"
                  value={medicineFormData.medicineType}
                  onChange={(event) => handleInputChange(event, 'Medicine')}
                />
                <input
                  className="mt-2 bg-light fs-6 form-control form control-lg "
                  placeholder="Enter Time to Next Dose"
                  type="text"
                  name="timeToNextDose"
                  value={medicineFormData.timeToNextDose}
                  onChange={(event) => handleInputChange(event, 'Medicine')}
                />
                <input
                  className="mt-2 bg-light fs-6 form-control form control-lg "
                  placeholder="Enter Description"
                  type="text"
                  name="medicineDescription"
                  value={medicineFormData.medicineDescription}
                  onChange={(event) => handleInputChange(event, 'Medicine')}
                />
              </form>
              </div>
            </div>
          </div>
        );
      case 'Symptom':
        return (
          <div className="container mt-3">
            <div className="row">
              <div className="col-12 mt-1 border rounded-5 p-3">
                <p>Enter your Symptom event information</p>
                <form>
                  <input
                    className="mt-2 bg-light fs-6 form-control form control-lg "
                    placeholder="Enter Symptom Type"
                    type="text"
                    name="symptomType"
                    value={symptomFormData.symptomType}
                    onChange={(event) => handleInputChange(event, 'Symptom')}
                  />
                  <input
                    className="mt-2 bg-light fs-6 form-control form control-lg "
                    placeholder="Enter Severity"
                    type="text"
                    name="symptomSeverity"
                    value={symptomFormData.symptomSeverity}
                    onChange={(event) => handleInputChange(event, 'Symptom')}
                  />
                  <input
                    className="mt-2 bg-light fs-6 form-control form control-lg "
                    placeholder="Enter Description"
                    type="text"
                    name="symptomDescription"
                    value={symptomFormData.symptomDescription}
                    onChange={(event) => handleInputChange(event, 'Symptom')}
                  />
                </form>
              </div>
            </div>
          </div>
        );
      case 'Other':
        return (
          <div className="container mt-3">
            <div className="row">
              <div className="col-12 mt-1 border rounded-5 p-3">
                <p>Enter your Other event information</p>
                <form>
                  <input
                    className="mt-2 bg-light fs-6 form-control form control-lg "
                    placeholder="Enter Description"
                    type="text"
                    name="otherDescription"
                    value={otherFormData.otherDescription}
                    onChange={(event) => handleInputChange(event, 'Other')}
                  />
                </form>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };
  
  // const calculateDropdownHeight = () => {
  //   const dropdownItemHeight = 40; // Adjust this based on your styles
  //   const numberOfItems = 3; // Adjust this based on the actual number of items
  //   return dropdownItemHeight * numberOfItems;
  // };
  

  

  

  // useEffect(() => {
  //   console.log(state.user)
  // },[])

  // called when loaded, checks to see if we have a user
  useEffect(() => {
    let num = 0;
    if (state.user) {
      num = state.user.user_id;
      // console.log(state.user)
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
    if (user_id != 0) {
      const getUser = async () => {
        console.log(state);
        console.log(state.user)
        let response = await GetUserService.getUserData(
          user_id,
          state.user.access_token
        );
        console.log(response);
        setUserData(response.data);
        // dispatch response.data here
        console.log(state.user);
      };
      getUser() // make sure to catch any error
        .catch(console.error);
    }
  }, [user_id]);

 
  return (
    <>
      <div id={styles.page}>
        <div className="container my-5">
          <div className="row">
            <Navbar />
          </div>
          {state.user ? (
            <>
              <div className="row">
                <div className="col-4"></div>
                <div className="col-4 mt-5 border rounded-5 shadow text-center" id={styles.componentcolor}>
                  <h4 className="p-2" id={styles.textbasefont}>Hello, {user.username}</h4>
                  <p id={styles.textbasefont}>Add a new event to your family calendar!</p>
                </div>
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
                  selectable
                  defaultView="day"
                  views={["day", "week", "month"]}
                  toolbar
                  popup
                  onSelectSlot= {(slotInfo) => {
                  openModal(slotInfo);
                  }}
                />
                {showModal && (
                  <div
                  style={{
                    position: "fixed",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    backgroundColor: "white",
                    zIndex: "999",
                    padding: "20px",
                    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
                  }}>
                  <div className="dropdown d-flex justify-content-center">
                    <button className="btn btn-lg btn-primary w-30 fs-6 mt-3 dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                      Select Event Type
                    </button>
                    <div className="d-flex flex-column align-items-center justify-content-center">
                    <ul className="dropdown-menu">
                      <li><button className="btn btn-lg btn-primary w-30 fs-6 m-3" onClick={() => handleEventTypeClick('Medicine')}>Medicine</button></li>
                      <li><button className="btn btn-lg btn-primary w-30 fs-6 m-3" onClick={() => handleEventTypeClick('Symptom')}>Symptom</button></li>
                      <li><button className="btn btn-lg btn-primary w-30 fs-6 m-3" onClick={() => handleEventTypeClick('Other')}>Other</button></li>
                    </ul>
                    </div>
                  </div>
                  {renderForm()}  
                  <div className="row">
                    <div className="col-6 d-flex justify-content-center">
                      <button className="btn btn-lg btn-primary w-30 fs-6 mt-3" onClick={submitModal}>
                        Submit
                      </button>
                    </div>
                    <div className="col-6 d-flex justify-content-center">
                      <button className="btn btn-lg btn-primary w-30 fs-6 mt-3" onClick={closeModal}>
                        Close
                      </button>
                    </div>
                  </div>
                </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default DailyCalendar;
