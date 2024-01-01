import EventCard from "./EventCard";
import React, { useState } from "react";
import { eventDetails } from "../Scripts/event_details";
import "../Styles/Events.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Events = () => {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            infinite: true,
            dots: true,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            initialSlide: 1,
          },
        },
      ],
    };
  
    return (
        <div className="info-section" id="services">
            <div className="info-title-content">
               <h3 className="info-title">
                <span>Events</span>
                </h3>
                <p className="info-description">
                  We conduct various events including free health and dental checkups by our expert doctors.
                  We aim to bring healthcare at your convenience, so please look out for the events in our hospital
                   and be a part of our family.
                 </p>
               </div>
        
        
        <Slider {...settings}>
          {eventDetails.map((event, index) => (
            <div key={index} className = "info-cards">
              {/* <h3>{event.name}</h3>
              <p>
                <strong>Location:</strong> {event.location}
              </p>
              <p>
                <strong>Date:</strong> {event.date}
              </p>
              <p>
                <strong>Time:</strong> {event.time}
              </p>
              <p>{event.description}</p> */}
              <EventCard className = "event-card"
                name = {event.name}
                location = {event.location}
                date = {event.date}
                time = {event.time}
                description = {event.description}
                />
            </div>
          ))}
        </Slider>
      </div>
      
    );
  };
  
  export default Events;

// function Events() {
//   let eName1, eLocation1, eDate1, eTime1, eDescription1;
//   let eName2, eLocation2, eDate2, eTime2, eDescription2;
//   let eName3, eLocation3, eDate3, eTime3, eDescription3;
//   const eventsLength = eventDetails.length - 1;
//   const [event1, setEvent1] = useState(0);
//   const [event2, setEvent2] = useState(0);
//   const [event3, setEvent3] = useState(0);

//   // back to previous event
//   const backBtnClick = () => {
//     setEvent1(event1 <= 2 ? eventsLength : event1 - 3);
//     setEvent2(event2 <= 2 ? eventsLength : event2 - 3);
//     setEvent3(event3 <= 2 ? eventsLength : event3 - 3);
//     handleEventsUpdation();
//   };

//   // go to newer event
//   const frontBtnClick = () => {
//     setEvent1(event1 >= eventsLength ? 0 : event1 + 3);
//     setEvent2(event2 >= eventsLength ? 0 : event2 + 3);
//     setEvent3(event3 >= eventsLength ? 0 : event3 + 3);
//     handleEventsUpdation();
//   };

//   // update reviews
//   const handleEventsUpdation = () => {
//     const eventMessage1 = eventDetails[event1];
//     eName1 = eventMessage1.name;
//     eLocation1 = eventMessage1.location;
//     eDate1 = eventMessage1.date;
//     eTime1 = eventMessage1.time;
//     eDescription1 = eventMessage1.description;

//     const eventMessage2 = eventDetails[event2];
//     eName2 = eventMessage2.name;
//     eLocation2 = eventMessage2.location;
//     eDate2 = eventMessage2.date;
//     eTime2 = eventMessage2.time;
//     eDescription2 = eventMessage2.description;

//     const eventMessage3 = eventDetails[event3];
//     eName3 = eventMessage3.name;
//     eLocation3 = eventMessage3.location;
//     eDate3 = eventMessage3.date;
//     eTime3 = eventMessage3.time;
//     eDescription3 = eventMessage3.description;
    
//   };

//   // list review on visit
//   handleEventsUpdation();

//   return (
//     // <div className="review-section" id="reviews">
//     //   <div className="rw-text-content">
//     //     <p className="rw-text-title">
//     //       More over <span className="rw-text-num">1500+ Customers</span>
//     //     </p>

//     //     <p className="rw-text-desc">Don't believe us, Check clients word</p>

//     //     <p className="rw-text-format">
//     //       <span className="rw-text-quote1">''</span>
//     //       <span className="rw-review">{eDescription}</span>
//     //       <span className="rw-text-quote2">''</span>
//     //     </p>

//     //     <div className="rw-authors">
//     //       <div className="rw-names">
//     //         <p className="rw-reviewer-name">{eName}</p>
//     //         <p className="rw-reviewer-place">{eLocation}</p>
//     //       </div>

//     <div className="review-section" id="reviews">
//       <div className="rw-text-content">

//     <div className="info-section" id="services">
//       <div className="info-title-content">
//         <h3 className="info-title" style={{width:"100%"}}>
//           <span>Events</span>
//         </h3>
//         <p className="info-description">
//           We conduct various events including free health and dental checkups by our expert doctors.
//           We aim to bring healthcare at your convenience, so please look out for the events in our hospital
//           and be a part of our family.
//         </p>
//       </div>

//       <div className="info-cards-content">
//         <InformationCard
//           title={eName1}
//           description={eDescription1}
//           icon={faTruckMedical}
//         />

//         <InformationCard
//           title={eName2}
//           description={eDescription2}
//           icon={faHeartPulse}
//         />

//         <InformationCard
//           title={eName3}
//           description={eDescription3}
//           icon={faTooth}
//         />
//       </div>
//       </div>
//       </div>

//           <div className="rw-btns">
//             <button
//               className="rw-next-btn"
//               type="button"
//               onClick={backBtnClick}
//             >
//               ←
//             </button>
//             <button
//               className="rw-next-btn"
//               type="button"
//               onClick={frontBtnClick}
//             >
//               →
//             </button>
//           </div>
//         </div>
      
    
//   );
// }


// //   return (
// //     <div className="info-section" id="services">
// //       <div className="info-title-content">
// //         <h3 className="info-title">
// //           <span>Events</span>
// //         </h3>
// //         <p className="info-description">
// //           We conduct various events including free health and dental checkups by our expert doctors.
// //           We aim to bring healthcare at your convenience, so please look out for the events in our hospital
// //           and be a part of our family.
// //         </p>
// //       </div>

// //       <div className="info-cards-content">
// //         <InformationCard
// //           title="Emergency Care"
// //           description="Our Emergency Care service is designed to be your reliable support
// //             in critical situations. Whether it's a sudden illness, injury, or
// //             any medical concern that requires immediate attention, our team of
// //             dedicated healthcare professionals is available 24/7 to provide
// //             prompt and efficient care."
// //           icon={faTruckMedical}
// //         />

// //         <InformationCard
// //           title="Heart Disease"
// //           description="Our team of experienced cardiologists and medical experts use
// //             state-of-the-art technology to assess your cardiovascular health and
// //             design personalized treatment plans. From comprehensive screenings
// //             to advanced interventions, we are committed to helping you maintain
// //             a healthy heart and lead a fulfilling life."
// //           icon={faHeartPulse}
// //         />

// //         <InformationCard
// //           title="Dental Care"
// //           description="Smile with confidence as our Dental Care services cater to all your
// //             oral health needs. Our skilled dentists provide a wide range of
// //             treatments, from routine check-ups and cleanings to cosmetic
// //             procedures and restorative treatments."
// //           icon={faTooth}
// //         />
// //       </div>
// //     </div>
// //  );
// //}

// export default Events;
