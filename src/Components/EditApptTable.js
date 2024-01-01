import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { doc, setDoc } from "firebase/firestore"; 
import { database } from "../firebaseConfig"

const EditApptTable = ({ appointments, selectedAppointment, setAppointments, setIsEditing, getAppointments}) => {
  const id = selectedAppointment.id;

  const [name, setName] = useState(selectedAppointment.Name);
  const [appType, setappType] = useState(selectedAppointment.AppType);
  const [contact, setContact] = useState(selectedAppointment.Contact);
  const [mode, setMode] = useState(selectedAppointment.Mode);
  const [dateSlot, setDateSlot] = useState(selectedAppointment.DateSlot);
  const [timeSlot, setTimeSlot] = useState(selectedAppointment.TimeSlot);


  const handleUpdate = e => {
    e.preventDefault();

    if (!name || !appType || !contact || !mode || !dateSlot || !timeSlot) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'All fields are required.',
        showConfirmButton: true,
      });
    }

    const appointment = {
      Name: name,
      AppType: appType,
      Contact: contact,
      Mode : mode,
      DateSlot: dateSlot,
      TimeSlot: timeSlot,
    };

    // TODO: Update document
    setDoc(doc(database, "patients", id), {
      ...appointment,
    });

    setAppointments(appointments);
    setIsEditing(false);
    getAppointments();

    Swal.fire({
      icon: 'success',
      title: 'Updated!',
      text: `Appointment has been updated.`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div className='form-container'>
      <form className='form-content' onSubmit={handleUpdate}>
        <h1>Edit Appointment Details</h1>
        <br />
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          name="name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <br /><br />
        <label htmlFor="appType">Appointment Type</label>
        <input
          id="appType"
          type="text"
          name="appType"
          value={appType}
          onChange={e => setappType(e.target.value)}
        />
        <br /><br />
        <label htmlFor="contact">Contact</label>
        <input
          id="contct"
          type="text"
          name="contact"
          value={contact}
          onChange={e => setContact(e.target.value)}
        />
        <br /><br />
        <label htmlFor="mode">Mode</label>
        <input
          id="mode"
          type="text"
          name="mode"
          value={mode}
          onChange={e => setMode(e.target.value)}
        />
        <br /><br />
        <label htmlFor="dateSlot">Date Slot</label>
        <input
          id="dateSlot"
          type="date"
          name="dateSlot"
          value={dateSlot}
          style={{width:'50%'}}
          onChange={e => setDateSlot(e.target.value)}
        />
        <br /><br /><br />
        <label htmlFor="timeSlot">Time Slot</label>
        <input
          id="timeSlot"
          type="text"
          name="timeSlot"
          value={timeSlot}
          onChange={e => setTimeSlot(e.target.value)}
        />
        <div style={{ marginTop: '30px' }}>
          <input className='text-appointment-btn' type="submit" value="Update" />
          <input
            style={{ marginLeft: '12px' }}
            className="text-appointment-btn"
            type="button"
            value="Cancel"
            onClick={() => setIsEditing(false)}
          />
        </div>
      </form>
    </div>
  );
};

export default EditApptTable;
