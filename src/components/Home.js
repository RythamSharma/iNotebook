import { useContext } from "react";
import React from "react";
import Note from "./Note";
import noteContext from "../context/notes/noteContext";
export default function Home() {
  const context = useContext(noteContext);
  const { searchNotes} = context;
  let search='';
  const onchange = (e) =>{
    search = e.target.value
    
  }
  const OnSubmit = (e) =>{
    e.preventDefault();
    searchNotes(search)
  }
  return (
    <>
    <div className="d-flex justify-content-between" style={{ marginTop:'3.5%'}}>
    <h2 className="mx-4 my-3" style={{visibility:'hidden'}} > iNotebook-Your Notes</h2>
    <form className="d-flex" role="search" onSubmit={OnSubmit}>
        <input className="form-control mx-2 my-3" onChange={onchange} type="search" placeholder="Search Note By Title" style={{border:'none',background:'none',borderBottom:'1px solid #000',boxShadow: "none"}} aria-label="Search"/>
        <button className="btn btn-outline-dark mx-2 my-3" type="submit">Search!</button>
      </form>
    </div>
    <div className="container">
      <Note/>
    </div>
    </>
  )
}
