import React, { useState, useEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../Styles/AppointmentForm.css";
import { ToastContainer, toast } from "react-toastify";
import { database } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
//import Swal from "sweetalert2";
import Select from "react-select";
import axios from "axios";
import RazorpayQuickButton from './RazorpayImplementation/RazorpayQuickButton';
//import { margins } from "pdfkit/js/page";

function AppointmentFormDoctor() {
  const navigate = useNavigate();
  const collectionRef = collection(database, "patients");
  const location = useLocation(); // Get the current location
  const { doctorName } = location.state || {}; // Get the doctorName from the location state

  useEffect(() => {
    // window.scrollTo({ top: 0, behavior: "smooth" });
    const fetchSymptoms = async () => {
      //const apiUrl = "https://sandbox-healthservice.priaid.ch/symptoms?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImFpc2gwNy5yYXZpQGdtYWlsLmNvbSIsInJvbGUiOiJVc2VyIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvc2lkIjoiMTI5NTIiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3ZlcnNpb24iOiIyMDAiLCJodHRwOi8vZXhhbXBsZS5vcmcvY2xhaW1zL2xpbWl0IjoiOTk5OTk5OTk5IiwiaHR0cDovL2V4YW1wbGUub3JnL2NsYWltcy9tZW1iZXJzaGlwIjoiUHJlbWl1bSIsImh0dHA6Ly9leGFtcGxlLm9yZy9jbGFpbXMvbGFuZ3VhZ2UiOiJlbi1nYiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvZXhwaXJhdGlvbiI6IjIwOTktMTItMzEiLCJodHRwOi8vZXhhbXBsZS5vcmcvY2xhaW1zL21lbWJlcnNoaXBzdGFydCI6IjIwMjMtMDktMjUiLCJpc3MiOiJodHRwczovL3NhbmRib3gtYXV0aHNlcnZpY2UucHJpYWlkLmNoIiwiYXVkIjoiaHR0cHM6Ly9oZWFsdGhzZXJ2aWNlLnByaWFpZC5jaCIsImV4cCI6MTY5NTcxMjE0MywibmJmIjoxNjk1NzA0OTQzfQ.3y8dqf81MAEbxlWSFt4BkfegrLHef9R7_CRmbRWtGhc&format=json&language=en-gb";
<<<<<<< HEAD
      const apiUrl = "https://sandbox-healthservice.priaid.ch/symptoms?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6Im5wc2hhaF9iMjFAaXQudmp0aS5hYy5pbiIsInJvbGUiOiJVc2VyIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvc2lkIjoiMTMzNDYiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3ZlcnNpb24iOiIyMDAiLCJodHRwOi8vZXhhbXBsZS5vcmcvY2xhaW1zL2xpbWl0IjoiOTk5OTk5OTk5IiwiaHR0cDovL2V4YW1wbGUub3JnL2NsYWltcy9tZW1iZXJzaGlwIjoiUHJlbWl1bSIsImh0dHA6Ly9leGFtcGxlLm9yZy9jbGFpbXMvbGFuZ3VhZ2UiOiJlbi1nYiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvZXhwaXJhdGlvbiI6IjIwOTktMTItMzEiLCJodHRwOi8vZXhhbXBsZS5vcmcvY2xhaW1zL21lbWJlcnNoaXBzdGFydCI6IjIwMjMtMTItMjciLCJpc3MiOiJodHRwczovL3NhbmRib3gtYXV0aHNlcnZpY2UucHJpYWlkLmNoIiwiYXVkIjoiaHR0cHM6Ly9oZWFsdGhzZXJ2aWNlLnByaWFpZC5jaCIsImV4cCI6MTcwNDEyODA4NSwibmJmIjoxNzA0MTIwODg1fQ.1T9L_0vMrSFTzvIcoc9tETnDVi9V0njqjxfJi8iA3UE&format=json&language=en-gb"
=======
      const apiUrl = "https://sandbox-healthservice.priaid.ch/symptoms?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImlzaGV0aDk4MDNAZ21haWwuY29tIiwicm9sZSI6IlVzZXIiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9zaWQiOiIxMzM0NSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvdmVyc2lvbiI6IjIwMCIsImh0dHA6Ly9leGFtcGxlLm9yZy9jbGFpbXMvbGltaXQiOiI5OTk5OTk5OTkiLCJodHRwOi8vZXhhbXBsZS5vcmcvY2xhaW1zL21lbWJlcnNoaXAiOiJQcmVtaXVtIiwiaHR0cDovL2V4YW1wbGUub3JnL2NsYWltcy9sYW5ndWFnZSI6ImVuLWdiIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9leHBpcmF0aW9uIjoiMjA5OS0xMi0zMSIsImh0dHA6Ly9leGFtcGxlLm9yZy9jbGFpbXMvbWVtYmVyc2hpcHN0YXJ0IjoiMjAyMy0xMi0yNyIsImlzcyI6Imh0dHBzOi8vc2FuZGJveC1hdXRoc2VydmljZS5wcmlhaWQuY2giLCJhdWQiOiJodHRwczovL2hlYWx0aHNlcnZpY2UucHJpYWlkLmNoIiwiZXhwIjoxNzA0MDkyODc1LCJuYmYiOjE3MDQwODU2NzV9.-bP2Tnzhj-CyjTn4sBCPQpvnZpPaCexMrcNN3nnmg4c&format=json&language=en-gb"
>>>>>>> a2a5b313175022e78db264a5cea9512f3886d0ec
      try {
        const response = await axios.get(apiUrl);
        console.log(response.data);
        setResult(response.data);
      } catch (error) {
        setError(error);
      }
    };

    fetchSymptoms();
  }, []);

  const [patientName, setPatientName] = useState("");
  const [patientNumber, setPatientNumber] = useState("");
  const [patientGender, setPatientGender] = useState("default");
  const [patientAge, setPatientAge] = useState("");
  const [ongoingMeds, setOngoingMeds] = useState("");
  const [medicalhistory, setMedicalHistory] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [appointmentType, setAppointmentType] = useState("default");
  const [preferredMode, setPreferredMode] = useState("default");
  const [patientSymptoms, setPatientSymptoms] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [timeSlot, setTimeSlot] = useState("");
  const [dateSlot, setDateSlot] = useState("");
  const [result, setResult] = useState([]);
  const [error, setError] = useState(null);
  const [selectedSymptom, setSelectedSymptom] = useState(null);
  const [selectedSymptomsList, setSelectedSymptomsList] = useState([]);

  const [selectedDoctorName, setSelectedDoctorName] = useState(
    doctorName || ""
  ); // Initialize with the doctorName from the location state

  const handleSubmit = (e) => {
    e.preventDefault();
    const symptomLabels = selectedSymptomsList.map((symptom) => symptom.label);
    // setPatientSymptoms(selectedSymptomsList)
    addDoc(collectionRef, {
      Name: patientName,
      Contact: patientNumber,
      Gender: patientGender,
      Age: patientAge,
      AppType: appointmentType,
      Symptoms: symptomLabels,
      Mode: preferredMode,
      TimeSlot: timeSlot,
      DateSlot: dateSlot,
      MedicalHistory: medicalhistory,
      OngoingMeds: ongoingMeds
    })
      .then(() => {
        // Swal.fire({
        //   position: 'top-center',
        //   icon: 'success',
        //   title: 'Thank you for filling out the form, please proceed to book your appointment slot',
        //   showConfirmButton: false,
        //   timer: 3500
        // })
        navigate("/bookappointment");
      })
      .catch((err) => {
        alert(err.message);
      });

    // Validate form inputs
    const errors = {};
    if (!patientName.trim()) {
      errors.patientName = "Patient name is required";
    } else if (patientName.trim().length < 8) {
      errors.patientName = "Patient name must be at least 8 characters";
    }

    if (!patientNumber.trim()) {
      errors.patientNumber = "Patient phone number is required";
    } else if (patientNumber.trim().length !== 10) {
      errors.patientNumber = "Patient phone number must be of 10 digits";
    }

    if (patientGender === "default") {
      errors.patientGender = "Please select patient gender";
    }
    if (!appointmentTime) {
      errors.appointmentTime = "Appointment time is required";
    } else {
      const selectedTime = new Date(appointmentTime).getTime();
      const currentTime = new Date().getTime();
      if (selectedTime <= currentTime) {
        errors.appointmentTime = "Please select a future appointment time";
      }
    }
    if (preferredMode === "default") {
      errors.preferredMode = "Please select preferred mode";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    // Reset form fields and errors after successful submission
    setPatientName("");
    setPatientNumber("");
    setPatientGender("default");
    setPatientAge("");
    setAppointmentType("");
    setPatientSymptoms("");
    setPreferredMode("default");
    setOngoingMeds("");
    setMedicalHistory("");
    setFormErrors({});

    navigate("/form-submit", {
      state: {
        formData: {
          patientName,
          patientNumber,
          patientGender,
          patientAge,
          appointmentType,
          preferredMode,
          ongoingMeds,
          medicalhistory
        },
      },
    });

    toast.success("Appointment Scheduled !", {
      position: toast.POSITION.TOP_CENTER,
      onOpen: () => setIsSubmitted(true),
      onClose: () => setIsSubmitted(false),
    });
  };

  const handleAddSymptom = () => {
    if (selectedSymptom) {
      setSelectedSymptomsList([...selectedSymptomsList, selectedSymptom]);
      setSelectedSymptom(null);
    }
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!result) {
    return <div>Loading...</div>;
  }

  const options = result.map((symptom) => ({
    value: symptom.ID,
    label: symptom.Name,
  }));

return (
  <div className="appointment-form-section">
    <h1 className="legal-siteTitle"></h1>

    <div className="form-container">
      <h2 className="form-title">
        <span>Book Appointment Online</span>
      </h2>

      <Tabs className={"tab_names"}>
        <TabList>
          <Tab>Patient Info</Tab>
          <Tab>Symptoms</Tab>
          <Tab>Medical History</Tab>
          <Tab>Appointment Details</Tab>
        </TabList>

        <TabPanel>
          <form className="form-content" onSubmit={handleSubmit}>
            {/* Patient Info Form Fields */}
            {/* ... (patient info form fields) */}
            
            <label style={{marginTop : '7vh'}}>
            Patient's Full Name:
            <input
              type="text"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              required
            />
            {formErrors.patientName && (
              <p className="error-message">{formErrors.patientName}</p>
            )}
          </label>

          <br />
          <label>
            Patient's Phone Number:
            <input
              type="text"
              value={patientNumber}
              onChange={(e) => setPatientNumber(e.target.value)}
              required
            />
            {formErrors.patientNumber && (
              <p className="error-message">{formErrors.patientNumber}</p>
            )}
          </label>

          <br />
          <label>
            Patient's Gender:
            <select
              value={patientGender}
              onChange={(e) => setPatientGender(e.target.value)}
              required
            >
              <option value="default">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="private">Prefer not to say</option>
            </select>
            {formErrors.patientGender && (
              <p className="error-message">{formErrors.patientGender}</p>
            )}
          </label>

          <br />
          <label>
            Patient's Age:
            <input
              type="number"
              min="1"
              value={patientAge}
              onChange={(e) => setPatientAge(e.target.value)}
              required
            />
          </label>
          <br />
          <label>
            Appointment Type:
            <select
              value={appointmentType}
              onChange={(e) => setAppointmentType(e.target.value)}
              required
            >
              <option value="default">Select</option>
              <option value="General Checkup">General Checkup</option>
              <option value="Follow-Up Checkup">Follow-Up Checkup</option>
              <option value="Emergency">Emergency</option>
            </select>
            {formErrors.patientGender && (
              <p className="error-message">{formErrors.patientGender}</p>
            )}
          </label>
          <br />
          


          </form>
        </TabPanel>

        <TabPanel>
          <form className="form-content" onSubmit={handleSubmit}>
            {/* Symptoms Form Fields */}
            {/* ... (symptoms form fields) */}

            <label style={{marginTop : '7vh'}}>
             Symptoms:
             <br /><br/>
             <Select
              options={options}
              value={selectedSymptom}
              onChange={(selectedOption) => setSelectedSymptom(selectedOption)}
              placeholder="Select a symptom"
              isSearchable={true}
            />
            <br />
            <button
              className="text-appointment-btn"
              type="button"
              onClick={handleAddSymptom}
            >
              Add Symptom
            </button>
            {selectedSymptomsList.length > 0 && (
              <div className="selected-symptoms-list">
                <h3>Selected Symptoms:</h3>
                <ul>
                  {selectedSymptomsList.map((symptom, index) => (
                    <li key={index}>{symptom.label}</li>
                  ))}
                </ul>
              </div>
            )}
          </label>
          <br />
          </form>
        </TabPanel>

        <TabPanel style={{marginTop : '7vh'}}>
          <form className="form-content" onSubmit={handleSubmit}>
            {/* Medical History Form Fields */}
            {/* ... (medical history form fields) */}
            <label>
             Provide Details of any ongoing Medications or Allergies:
          <input type="text" value={ongoingMeds}
              onChange={(e) => setOngoingMeds(e.target.value)} />
          </label>
          <br />
          <label>
            Provide Details of Relevant Diagnosis(Medical History):
            <input type="text" value={medicalhistory}
              onChange={(e) => setMedicalHistory(e.target.value)} />
          </label>

          <br />
          </form>
        </TabPanel>

        <TabPanel>
          <form className="form-content" onSubmit={handleSubmit}>
            {/* Appointment Details Form Fields */}
            {/* ... (appointment details form fields) */}
              <label style={{marginTop : '7vh'}}>
                Preferred Mode:
                <select
                  value={preferredMode}
                  onChange={(e) => setPreferredMode(e.target.value)}
                  required
                >
                  <option value="default">Select</option>
                  <option value="online">Online</option>
                  <option value="In-person">In-person</option>
                </select>
                {formErrors.preferredMode && (
                  <p className="error-message">{formErrors.preferredMode}</p>
                )}
              </label>

          <br />
          Razorpay payment gateway
          <p style={{fontSize: '1.15rem', marginBottom: '2.5vh', marginTop: '1.5vh'}}>Please proceed to pay Rs.50 in order to successfully book an appointment:</p>
     

          <RazorpayQuickButton />

          {/* <br />
          <button type="submit" className="text-appointment-btn">
            Proceed to Book Appointment Slot
          </button> */}

          {/* <p
            className="success-message"
            style={{ display: isSubmitted ? "block" : "none" }}
          >
            Appointment details has been sent to the patients phone number via
            SMS.
          </p> */}
          </form>
        </TabPanel>
      </Tabs>
    </div>

    <div className="legal-footer">
      <p>© 2023 SwasthSaathi. All rights reserved.</p>
    </div>

    <ToastContainer autoClose={5000} limit={1} closeButton={false} />
  </div>
);
}

export default AppointmentFormDoctor;