import React from "react";
import RoutinesList from "./RoutinesList.jsx";
import $ from 'jquery';

// import Player from "./Player.jsx";

// GET routines and display them in a handler of some kind

const App = () => {
  const onGetPoses = async (cb) => {
    $.ajax({
      url: '/routine/poses',
      method: 'GET',
      success: function(data) {
        console.log('GET SUCCESS');
        cb(data);
      },
      error: function(err) {
        console.log('Err', err);
      }
    });
  };

  return (
    <>
      <RoutinesList onGetPoses={onGetPoses} />
    </>
  )
};

export default App;