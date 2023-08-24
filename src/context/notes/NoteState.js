import React, { useState } from "react";
import noteContext from "./noteContext";
const host = "http://localhost:5000";
const NoteState = (props) => {
  const [Notes, setNotes] = useState([]);

  const getNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token')
      },
    });
    const jsonData = await response.json();
    setNotes(jsonData);
  };

  const searchNotes = async (search) => {
    const response = await fetch(`${host}/api/notes/searchnotes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ search }),
    });
  
    if (response.ok) {
      const jsonData = await response.json();
      setNotes(jsonData);
    } else {
      console.error("Error fetching data:", response.statusText);
    }
  };
  

  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json= await response.json();
    setNotes(Notes.concat(json));
  };

  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token')
      },
    });
    const json = await response.json();
    console.log(json);
    const newNotes = Notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  const editNote = async (title, description, tag, id) => {
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    console.log(json);
    let newNote=JSON.parse(JSON.stringify(Notes))
    for (let index = 0; index < Notes.length; index++) {
      const element = Notes[index];
      if (element._id === id) {
        newNote[index].title = title;
        newNote[index].description = description;
        newNote[index].tag = tag;
        break;
      }
      setNotes(newNote);
    }
  };
  return (
    <noteContext.Provider
      value={{ Notes, addNote, deleteNote, editNote, getNotes, searchNotes }}
    >
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
