import React from "react";
import { useState, useEffect } from "react";
import AdminAppointmentTable from "./AdminAppoinmentTable";
//import profilestyle from "../Styles/Profile.module.css";
import { database } from "../firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
//import Swal from 'sweetalert2';

const AdminProfile = () => {
    const [appointments, setAppointments] = useState([]);
    
    const getAppointments = async () => {
      const q = query(collection(database, "patients"), where("DateSlot", "!=", ""));
      const querySnapshot = await getDocs(q);
      const appointments = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
      setAppointments(appointments);
    } 

    useEffect(() => {
      getAppointments();
    }, []);

  return (  
    <div>
    <br />
      <h1 className="legal-siteTitle">Appointment table</h1>
      <br /><br />
      <AdminAppointmentTable 
      appointments={appointments} />
    </div>
  );
};

export default AdminProfile;
