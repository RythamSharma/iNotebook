import React from "react";
import { useContext } from "react";
import noteContext from "../context/notes/noteContext";


const Noteitem =(props)=>{
    const {note, updatenote}=props;
    const context = useContext(noteContext);
    const { deleteNote} = context;
    return (
        <div className="my-3 col-md-3 " >
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">{note.title}</h5>
              <p className="card-text">{note.description}</p>
              <i className="fa-solid fa-trash-can mx-2" onClick={()=>{deleteNote(note._id)}}></i>
              <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{updatenote(note)}}></i>
            </div>
          </div>
        </div>
    )
}

export default Noteitem;

