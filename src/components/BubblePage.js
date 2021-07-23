import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";
import fetchColorService from '../services/fetchColorService';
import axiosWithAuth from "../helpers/axiosWithAuth";
import axios from "axios";

const BubblePage = () => {
  const [colors, setColors] = useState([]);
  const [editing, setEditing] = useState(false);
  const { push } = useHistory

  useEffect(() => {
    axiosWithAuth()
      .get('colors')
      .then(res => {
        setColors(res.data)
      })
  }, [])

  const toggleEdit = (value) => {
    setEditing(value);
  };

  const saveEdit = (editColor) => {
  };

  const deleteColor = (colorToDelete) => {
    console.log(colorToDelete)
    axiosWithAuth()
      .delete(`/colors/${colorToDelete.id}`)
      .then(res => {
        console.log(res)

        axiosWithAuth()
          .get('colors')
          .then(res => {
          setColors(res.data)
        })
        
      })
      .catch(err => {
        console.log(err)
      })
  };

  return (
    <div className="container">
      <ColorList colors={colors} editing={editing} toggleEdit={toggleEdit} saveEdit={saveEdit} deleteColor={deleteColor}/>
      <Bubbles colors={colors}/>
    </div>
  );
};

export default BubblePage;

//Task List:
//1. When the component mounts, make an axios call to retrieve all color data and push to state.
//2. Complete toggleEdit, saveEdit, deleteColor and functions
