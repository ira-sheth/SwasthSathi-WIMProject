import React, { useState,useEffect,useMemo } from "react";
import "../App.css"
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import L from "leaflet";
import { useMap } from "react-leaflet";


const customIcon = L.icon({
  iconUrl: "./placeholder.png",
  iconSize: [60, 60],
});


const LeafletGeocoder = () => {
  const [selectSource, setSelectSource] = useState("");
  const [selectDestination, setSelectDestination] = useState("");
  const routingControlRef = React.useRef(null);
  const circleMarkerRef = React.useRef(null);

  const map = useMap();
  
  useMemo(() => {

    const circleCoordinates = [selectSource,selectDestination];
    const circleOptions = {
      color: "blue",
      fillColor: "blue",
      fillOpacity: 0.1,
      radius: 5000, 
    };

    const circleMarker = L.circle(circleCoordinates, circleOptions).addTo(map);
  
    const control=L.Control.geocoder({
      defaultMarkGeocode: true,
      placeholder: 'Enter a location',
    }).addTo(map)

    const directions = L.Routing.control({
      waypoints: [],
      lineOptions: {
        styles: [
          {
            color: "blue",
            weight: 4,
            opacity: 0.7,
          },
        ],
      },
      routeWhileDragging: true,
      geocoder: L.Control.Geocoder.nominatim(),
      addWaypoints: true,
      draggableWaypoints: false,
      fitSelectedRoutes: true,
      showAlternatives: false,
      
    }).addTo(map);


      control.on("markgeocode", function (e) {
        var latlng = e.geocode.center;
        console.log(e.geocode.name)
        L.marker(latlng).addTo(map).bindPopup(e.geocode.name).openPopup();
        map.fitBounds(e.geocode.bbox);
        // console.log(latlng.toString())
        // console.log(typeof(latlng.toString()))
        


        if (!selectSource) {
          setSelectSource(latlng);

        } else if (!selectDestination) {
          setSelectDestination(latlng);

        }else {
          setSelectSource(null);
          setSelectDestination(null);
          routingControlRef.current.setWaypoints([]);
          if (circleMarkerRef.current) {
            map.removeLayer(circleMarkerRef.current);
          }
        }

        if (selectSource && selectDestination) {
          routingControlRef.current.setWaypoints([selectSource, selectDestination]);
          // const circleMarker = L.circle(selectSource, radius, circleOptions).addTo(map);
          circleMarkerRef.current = circleMarker;

        }

        
      
      });
      routingControlRef.current = directions;
      
      return () => {
        control.removeFrom(map);
        directions.removeFrom(map);
        map.removeLayer(circleMarker);
      };
      
      
      
  }, [map,selectSource, selectDestination]);

  

  return null;
};

export default LeafletGeocoder;