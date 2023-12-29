// AppointmentTable.js
import React from 'react';

const AdminAppointmentTable = ({ appointments }) => {
  return (
    <div>
      <h2>Appointment Table</h2>
      <table>
        <thead>
          <tr>
            <th>Name of Patient</th>
            <th>Appoinment Type</th>
            <th>Contact</th>
            <th>Mode</th>
            <th>Date Slot</th>
            <th>Time Slot</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map(appointment => (
            <tr key={appointment.id}>
              <td>{appointment.Name}</td>
              <td>{appointment.AppType}</td>
              <td>{appointment.Contact}</td>
              <td>{appointment.Mode}</td>
              <td>{appointment.DateSlot}</td>
              <td>{appointment.TimeSlot}</td>
            </tr>
           ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminAppointmentTable;
