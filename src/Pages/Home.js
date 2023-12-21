import { BiCalendar } from "react-icons/bi";
import Search from "../Search";
import AddAppointment from "../AddApointment";
import AppointmentInfo from "../AppointmentInfo";
import { useState, useEffect, useCallback } from 'react'
import '../styles/App.css';

function Schedule() {

  let [AppointmentList, setAppointmentList] = useState([]);
  let [Input, setInput] = useState("");
  let [sortBy, setSortBy] = useState("petName");
  let [orderBy, setOrderBy] = useState("asc");

  const fetchData = useCallback(() => {
    fetch('./data.json')
    .then(response => response.json())
    .then(data => {
      setAppointmentList(data)
    });
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])


  const filteredAppointments = AppointmentList.filter(
    item => {
      return (
        item.petName.toLowerCase().includes(Input.toLowerCase()) ||
        item.ownerName.toLowerCase().includes(Input.toLowerCase()) ||
        item.aptNotes.toLowerCase().includes(Input.toLowerCase())
      )
    }
  ).sort((a, b) => {
    let order = (orderBy === 'asc') ? 1 : -1;
    return(
      a[sortBy].toLowerCase() < b[sortBy].toLowerCase()  ? -1 * order : 1 * order
    )
  })

  return (
    <div>
        <div className="App">
            <h1>
                <BiCalendar />
                Your Appointments
            </h1>
            <AddAppointment 
                onSendAppointment = {newAppointment => setAppointmentList([...AppointmentList, newAppointment])}
                lastId = {AppointmentList.reduce((max, item) => Number(item.id) > max ? Number(item.id) : max, 0)}
            /> 
            <Search 
                Input={Input}
                onInputChange={newInput => setInput(newInput)}
                orderBy = {orderBy}
                onOrderByChange = {sort => setOrderBy(sort)}
                sortBy = {sortBy}
                onSortByChange = {sort => setSortBy(sort)}/>
        </div>
      <ul className="UnOrdered-List">
        {filteredAppointments.map((Appointment) => (
          /*calling AppitmentList and map it to show every appointment from data.json
          * then set it up with the variable of Appointment
          */
          <AppointmentInfo 
          /*
            call the AppointmentInfo constant and send some important information including the
            delete function, that excludes only the appointment.id that we're selecting from the
            appointment list
          */
            key={Appointment.id}
            Appointment = {Appointment} 
            onDeleteAppointment = {
              AppointmentId => 
                setAppointmentList(AppointmentList.filter(Appointment => Appointment.id !== AppointmentId))
            }
          />
        ))}
      </ul>
    </div>
  );
}

export default Schedule;
