import React from "react";
import { useState, useEffect } from "react";
import AdminAppointmentTable from "./AdminAppoinmentTable";
//import profilestyle from "../Styles/Profile.module.css";
import { database } from "../firebaseConfig";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
//import Swal from 'sweetalert2';

const AdminProfile = () => {
    const [appointments, setAppointments] = useState([]);
    
    const getAppointments = async () => {
      const querySnapshot = await getDocs(collection(database, "patients"));
      const appointments = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
      setAppointments(appointments);
    } 

    useEffect(() => {
      getAppointments();
    }, []);

  return (
    <div>
      <h1>Admin Profile</h1>
      <AdminAppointmentTable 
      appointments={appointments} />
    </div>
  );
};

export default AdminProfile;
