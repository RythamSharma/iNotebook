import React, { useState } from "react";
import noteContext from "../context/notes/noteContext";
import { useContext } from "react";

function Addnote() {
  const context = useContext(noteContext);
  const { addNote } = context;

  const [note, setNote] = useState({ Title: "", Description: "", Tag: "" });

  const handleOnSubmit = async(e) => {
    e.preventDefault();
    await addNote(note.Title, note.Description, note.Tag);
    setNote({ Title: "", Description: "", Tag: "" });
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="container my-2">
        <h1 style={{fontFamily:'Poppins'}}>Add Notes</h1>
      </div>
      <form onSubmit={handleOnSubmit}>
        <div className="mb-3 col-md-13">
          <label htmlFor="Title" className="form-label">
            Title
          </label>
          <input
            required
            minLength={5}
            type="text"
            className="form-control"
            id="Title"
            name="Title"
            value={note.Title}
            onChange={onChange}
            style={{ border: "none",borderBottom: "1px solid #000", background: "none" ,boxShadow: "none"}}
          />
        </div>
        <div className="mb-3 col-md-13">
          <label htmlFor="Description" className="form-label">
            Description
          </label>
          <input
            required
            value={note.Description}
            minLength={5}
            type="text"
            className="form-control"
            id="Description"
            name="Description"
            onChange={onChange}
            style={{ border: "none",borderBottom: "1px solid #000", background: "none",boxShadow: "none" }}
          />
        </div>
        <div className="mb-3 col-md-13">
          <label htmlFor="Tag" className="form-label">
            Tag
          </label>
          <input
            required
            value={note.Tag}
            minLength={5}
            type="text"
            className="form-control"
            id="Tag"
            name="Tag"
            onChange={onChange}
            style={{ border: "none",borderBottom: "1px solid #000", background: "none",boxShadow: "none" }}
          />
        </div>
        <button type="submit" className="btn btn-dark">
          Add Note
        </button>
      </form>
    </>
  );
}

export default Addnote;
