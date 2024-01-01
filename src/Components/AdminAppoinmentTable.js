// AppointmentTable.js
import React from 'react';


const AdminAppointmentTable = ({ appointments, handleDelete, handleEdit }) => {
  return (
    <div>
      <table style={{backgroundColor : 'rgb(223, 239, 255)'}}>
        <thead>
          <tr>
            <th>Name of Patient</th>
            <th>Appoinment Type</th>
            <th>Contact</th>
            <th>Mode</th>
            <th>Date Slot</th>
            <th>Time Slot</th>
            <th></th>
            <th></th>
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
              <td className="text-right">
                  <button
                    onClick={() => handleEdit(appointment.id)}
                    className="button muted-button"
                  >
                    Edit
                  </button>
                </td>
              <td className="text-left">
                  <button
                    onClick={() => handleDelete(appointment.id)}
                    className="button muted-button"
                  >
                    Delete
                  </button>
                </td>
            </tr>
           ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminAppointmentTable;
