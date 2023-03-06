import React, { useEffect, useState } from 'react';
import './App.css';

interface Coords {
  latitude: number;
  longitude: number;
}
interface Position {
  coords: Coords
}



function App() {
  const watchID = navigator.geolocation.watchPosition(showPosition);
  const [position, setPosition] = useState<Coords>()
  const [err, setErr] = useState()
  function showPosition(position: Position) {
    const {latitude, longitude} = position.coords;
    console.log("Latitude: " + latitude + ", Longitude: " + longitude);
    setPosition({latitude, longitude})
  }
  
  const errHandler = (e: any) => {
    // alert(e)
    setErr(e)
  }
  
  useEffect(()=> {

    if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(showPosition, errHandler);
} else {
  alert("Geolocation is not supported by this browser.");
}
      setTimeout(function() {
        navigator.geolocation.clearWatch(watchID);
      }, 1000);

  }, [watchID])
  

  return (
    <div className="App">
      Coords: 
      <pre>{JSON.stringify(position, null, 2)}</pre>
      Err: 
      <pre>{JSON.stringify(err, null, 2)}</pre>
    </div>
  );
}

export default App;
