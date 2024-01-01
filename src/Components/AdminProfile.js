import React from "react";
import { useState, useEffect } from "react";
import AdminAppointmentTable from "./AdminAppoinmentTable";
import EditApptTable from "./EditApptTable";
//import profilestyle from "../Styles/Profile.module.css";
import { database } from "../firebaseConfig";
import { collection, getDocs, query, where, deleteDoc, doc } from "firebase/firestore";
import Swal from 'sweetalert2';
const AdminProfile = () => {
    const [appointments, setAppointments] = useState([]);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    
    const getAppointments = async () => {
      const q = query(collection(database, "patients"), where("DateSlot", "!=", ""));
      const querySnapshot = await getDocs(q);
      const appointments = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
      setAppointments(appointments);
      console.log(appointments)
    } 

    useEffect(() => {
      getAppointments();
    }, []);

    const handleEdit = id => {
      const [appointment] = appointments.filter(appointment => appointment.id === id);
  
      setSelectedAppointment(appointment);
      setIsEditing(true);
    };

    const handleDelete = id => {
      Swal.fire({
        icon: 'warning',
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
      }).then(result => {
        if (result.value) {
          const [appointment] = appointments.filter(appointment => appointment.id === id);
  
          // TODO delete document
          deleteDoc(doc(database, "patients", id));
  
          Swal.fire({
            icon: 'success',
            title: 'Deleted!',
            text: `Appointmenent has been deleted.`,
            showConfirmButton: false,
            timer: 1500,
          });
  
          const appointmentCopy = appointments.filter(appointment => appointment.id !== id);
          setAppointments(appointmentCopy);
        }
      });
    };



  return (  
    <div>
    <br />
      <h1 className="legal-siteTitle">Appointment table</h1>
      <br /><br />
      { !isEditing && (
        <AdminAppointmentTable 
      appointments={appointments}
      handleDelete={handleDelete}
      handleEdit={handleEdit} />
      )}
      {isEditing && (
        <EditApptTable
          appointments={appointments}
          selectedAppointment={selectedAppointment}
          setAppointments={setAppointments}
          setIsEditing={setIsEditing}
          getAppointments={getAppointments}
        />
      )}
    </div>
  );
};

export default AdminProfile;
