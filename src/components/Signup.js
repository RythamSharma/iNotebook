import React from 'react'
import { useState } from 'react';
import {  useNavigate } from 'react-router-dom';
function Signup() {
    const [credentials, setcredentials] = useState({ naem:"",email:" ",password: ""});
    let navigate= useNavigate();
    const handleOnSubmit = async (e) =>{
        e.preventDefault();
        const {name, email,password}=credentials;
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              },
              body: JSON.stringify({name,email,password})
          });
          const json = await response.json()
          if(json.success){

              localStorage.setItem('token',json.authtoken);
              navigate("/");
            }
            else{
                alert("user already exists")
            }
    }
    const onChange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value });
      };
  return (
    <div>
      <div className="container"style={{marginTop:'15%'}}>
      <h2 className='my-5' style={{fontWeight:'bold',fontFamily:'Poppins'}} >Sign up to iNotebook</h2>
        <form onSubmit={handleOnSubmit} >
        <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              onChange={onChange}
              aria-describedby="emailHelp"
              style={{ border: "none",borderBottom: "1px solid #000", background: "none",boxShadow: "none" }}
            />
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              onChange={onChange}
              aria-describedby="emailHelp"
              style={{ border: "none",borderBottom: "1px solid #000", background: "none",boxShadow: "none" }}
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              onChange={onChange}
              className="form-control"
              required
              minLength={5}
              id="password"
              name="password"
              style={{ border: "none",borderBottom: "1px solid #000", background: "none",boxShadow: "none" }}
              
            />
          </div>
          <button type="submit" className="btn btn-dark">
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}

export default Signup
