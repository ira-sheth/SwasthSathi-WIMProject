import React, { useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable'; 
import hospitalLogo from './finallogo.png'
import { ref,uploadString, getDownloadURL } from 'firebase/storage';
import { app, database,storage} from "../firebaseConfig";
import { collection, getDocs, query, where } from 'firebase/firestore';


function DigitalPrescription() {
  const [patientName, setPatientName] = useState('');
  const [patientData, setPatientData] = useState(null);

  //yeh badhiya chal raha hai

  const fetchPatientData = async () => {
    const patientsCollection = collection(database, 'patients');
    const queryCriteria = where('Name', '==', patientName);

    try {
      const querySnapshot = await getDocs(query(patientsCollection, queryCriteria));

      // if (querySnapshot.size === 0) {
      //   alert('Patient not found');
      //   return;
      // }

      const patientData = querySnapshot.docs[0].data();
      setPatientData(patientData);
      console.log(patientData)
    } catch (error) {
      alert('Error fetching patient data: ' + error.message);
    }
  };

  //error idhar hai, dhudhna padega
  const generatePDF = async () => {
    if (patientData) {
      const doc = new jsPDF();
           
      const patientTable = [
        ['Name', patientData.Name],
        ['Age', patientData.Age],
        ['Gender', patientData.Gender],
        ['Appointment Type', patientData.AppType],
        ['Mode', patientData.Mode],
        ['Contact', patientData.Contact],
        ['Symptoms', patientData.Symptoms],
        ['Ongoing Medications', patientData.OngoingMeds],
        ['Medical History', patientData.MedicalHistory],
        ['DateSlot', patientData.DateSlot],
        ['TimeSlot', patientData.TimeSlot]
      ];

      // Set the document properties
      doc.setProperties({
        title: 'SwasthSaathi',
      });

      doc.addImage(hospitalLogo, 'PNG', 25, 20, 160, 60);

      // Add content to the PDF
      // doc.text('SwasthSaathi', 10, 10);
      doc.autoTable({
        startY: 100,
        head: [['Attribute', 'Value']],
        body: patientTable,
        theme: 'grid',
        styles: {
          fillColor: [68,123,190], 
          textColor: [255, 255, 255], 
          fontStyle: 'bold',
          halign: 'center', 
          valign: 'middle', 
          fontSize: 12, 
        }
        // didDrawPage: function (data) {
        //   if (data.afterPageContent.length !== 0) {
        //     doc.addPage();
        //   }
        // },
      });

      // Save the PDF
      doc.save('prescription.pdf');

      const pdfDataUri = doc.output('datauristring');
      const pdfFileName = `prescription_${patientData.Name}.pdf`;
      const storageRef = ref(storage,pdfFileName);

      try {
        await uploadString(storageRef, pdfDataUri, 'data_url');
        console.log('PDF uploaded to Firebase Storage:');

        // You can now get the download URL if needed
        const downloadURL = await getDownloadURL(storageRef);
        console.log('Download URL:', downloadURL);

        // Do any additional actions, like saving the downloadURL in Firestore or using it as needed.
      } catch (error) {
        console.error('Error uploading PDF:', error);
      }
    
  
  }
  };

  return (
    <div style={{textAlign:"center"}}>
      <h1 style={{marginleft:"50vh",padding:"5vh"}}>Share your details for a smooth checkup</h1>
      <input
        style={{width:"100vh",marginBottom:"5vh"}}
        type='text'
        value={patientName}
        onChange={(e) => setPatientName(e.target.value)}
        placeholder='Enter Patient Name'
      />
      <br/>
      <div>
      <button onClick={fetchPatientData}>Confirm Name</button>
      <button onClick={generatePDF}>Generate Patient Prescription</button>
      </div>
    </div>
  );
}

export default DigitalPrescription;
