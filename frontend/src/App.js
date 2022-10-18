import React, { useState,useEffect } from "react";
import axios from "axios"
import "./App.scss";
import {io} from "socket.io-client"
import DayList from "./components/DayList";
import Appointment from "./components/Appointment";
//import daysData from "./components/__mocks__/days.json";
//import appointmentsData from "./components/__mocks__/appointments.json";


export default function Application() {
  const [day, setDay]  = useState("Monday");
  const [days, setDays] = useState({});
  let appointmentsData = {};
  const [appointments, setAppointments] = useState(appointmentsData);

 
   // Web sockets test
  const socket=io("http://localhost:8005",{ transports : ['websocket'] })
  
  function RefreshDay(day){
    const def=1
    const days={
    Monday:1,
    Tuesday:2,
    Wednesday:3,
    Thursday:4,
    Friday:5
    }
   return(days[day] ?? def)
}
useEffect(()=>{
  const getInterviews = async () => {
    const dayID=RefreshDay(day)
    try{const res = await axios.get(`http://localhost:8005/interviews/${dayID}`);
    const interviews = await res.data;
   // console.log(interviews);
    return interviews }
    catch(e){console.log(e)
    }};
    const interviewsData =  Promise.resolve(getInterviews())
    interviewsData.then(value=>{
      setAppointments(value)
      appointmentsData = value;
      console.log(appointmentsData)
    })
  },[day])

useEffect(()=>{
  const getDays = async () => {
    try{const res = await axios.get(`http://localhost:8005/days`);
    const days =  await res.data;
 //   console.log(days);
    return days}catch(e){console.log(e)
  }};
  const daysData =  Promise.resolve(getDays())
  daysData.then(value=>{
    setDays(value)
    console.log(days)
  })
},[])


  function bookInterview(id, interview) {
    console.log(id, interview);    
    const isEdit = appointments[id].interview;
    setAppointments((prev) => {
      const appointment = {
        ...prev[id],
        interview: { ...interview },
      };
      const appointments = {
        ...prev,
        [id]: appointment,
      };
      // Web sockets
      if(isEdit){socket.emit("edit",appointments)}
      else{socket.emit("appointments",appointments)}


      return appointments;
    });
    if (!isEdit) {
      setDays((prev) => {
        const updatedDay = {
          ...prev[day],
          spots: prev[day].spots - 1,
        };
        const days = {
          ...prev,
          [day]: updatedDay,
        };
        return days;
      });
    }
  }
  
  function cancelInterview(id) {
    setAppointments((prev) => {
      const updatedAppointment = {
        ...prev[id],
        interview: null,
      };
      const appointments = {
        ...prev,
        [id]: updatedAppointment,
      };
      console.log(appointments)
      socket.emit("delete",appointments)
      return appointments;

    });
    setDays((prev) => {
      const updatedDay = {
        ...prev[day],
        spots: prev[day].spots + 1,
      };
      const days = {
        ...prev,
        [day]: updatedDay,
      };
      return days;
    });
  }
  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={days} value={day} onChange={setDay} />
        </nav>
      </section>
      <section className="schedule">
        {Object.values(appointments).map((appointment) => (
          <Appointment
            key={appointment.id}
            {...appointment}
            bookInterview={(interview) =>
              bookInterview(appointment.id, interview)
            }
            cancelInterview={cancelInterview}
          />
        ))}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
