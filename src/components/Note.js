import React, { useContext, useEffect, useRef,useState } from "react";
import Addnote from "./Addnote";
import noteContext from "../context/notes/noteContext";
import Noteitem from "./Noteitem";
import { useNavigate } from "react-router-dom";
export default function Note() {
  const context = useContext(noteContext);
  const { Notes, getNotes, editNote} = context;
  let navigate = useNavigate();
  useEffect(() => {
    if(localStorage.getItem('token')){
      getNotes();
    }
    else{
      navigate("/login")
    }
  }, []);
  const [note, setNote] = useState({ id:" ",eTitle: "", eDescription: "", eTag: "" });
  const updatenote = (currentnote) => {
    setNote({
    id: currentnote._id,
    eTitle: currentnote.title,
    eDescription: currentnote.description,
    eTag: currentnote.tag,
  });
    ref.current.click();
  };
  const handleOnSubmit = async(e) => {
    refClose.current.click();
    await editNote( note.eTitle, note.eDescription,note.eTag,note.id,)
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  const ref = useRef(null);
  const refClose = useRef(null);
  return (
    <>
      <Addnote />
      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        ref={ref}
      >
        Launch demo modal
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3 col-md-13">
                  <label htmlFor="eTitle" className="form-label" >
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="eTitle"
                    name="eTitle"
                    onChange={onChange}
                    value={note.eTitle}
                    required
                    minLength={5}
                  />
                </div>
                <div className="mb-3 col-md-13">
                  <label htmlFor="eDescription" className="form-label " >
                    Description
                  </label>
                  <input
                    required
                    minLength={5}
                    type="text"
                    className="form-control"
                    id="eDescription"
                    name="eDescription"
                    onChange={onChange}
                    value={note.eDescription}
                  />
                </div>
                <div className="mb-3 col-md-13">
                  <label htmlFor="eTag" className="form-label">
                    Tag
                  </label>
                  <input
                    required
                    minLength={5}
                    type="text"
                    className="form-control"
                    id="eTag"
                    name="eTag"
                    value={note.eTag}
                    onChange={onChange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refClose} 
              >
                Close
              </button>
              <button onClick={handleOnSubmit} disabled={note.eDescription.length<5 || note.eTitle.length<5} type="button" className="btn btn-dark">
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <h2 className="my-5" style={{fontFamily:'Poppins'}}>Your Notes:</h2>
      <div className="row">
        {Notes.map((Note) => {
          return (
            <Noteitem key={Note._id} updatenote={updatenote} note={Note} />
          );
        })}
      </div>
    </>
  );
}
