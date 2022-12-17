import React from "react";
import RoutinesList from "./RoutinesList.jsx";
import $ from 'jquery';

// import Player from "./Player.jsx";

// GET routines and display them in a handler of some kind

const App = () => {
  const [routines, setRoutines] = React.useState({});

  const getRoutines = async () => {
    $.ajax({
      url: '/routines',
      method: 'GET',
      success: function(data) {
        console.log('GET SUCCESS', data);
        setRoutines(data);
      },
      error: function(err) {
        console.log('Err', err);
      }
    });

    console.log(routines);
  };

  return (
    <>
      <RoutinesList rt={routines} getRoutines={getRoutines} />
    </>
  )
};

export default App;