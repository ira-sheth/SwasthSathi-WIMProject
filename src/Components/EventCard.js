import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function EventCard(props) {
  return (
    <div>
      {/* <span className="info-card-icon">
        <FontAwesomeIcon className="info-fa-icon" icon={props.icon} />
      </span> */}
      <p className="info-card-title">{props.name}</p>
      <p className="info-card-description">Location: {props.location}</p>
      <p className="info-card-description">Date: {props.date}</p>
      <p className="info-card-description">Time: {props.time}</p>
      <p className="info-card-description">{props.description}</p>

    </div>
  );
}

export default EventCard;
