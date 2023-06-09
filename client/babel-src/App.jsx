import React from "react";
import $ from 'jquery';
import { Route, Routes } from 'react-router-dom';

import RoutinesList from "./RoutinesList.jsx";
import Player from "./Player.jsx";

const App = () => {
  const [routines, setRoutines] = React.useState({});

  const getRoutines = async () => {
    $.ajax({
      url: '/routines',
      method: 'GET',
      success: function(data) {
        console.log('GET /routines success!');
        setRoutines(data);
      },
      error: function(err) {
        console.log('Err', err);
      }
    });

    console.log(routines);
  };

  return (
    <Routes>
      <Route path="/" element={<RoutinesList rt={routines} getRoutines={getRoutines} />} />
      <Route path="/routine/:id" element={<Player />} />
    </Routes>
  )
};

export default App;