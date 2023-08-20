import { useState } from "react";
import React from "react";
import {useNavigate} from 'react-router-dom';



function Login() {
    let navigate = useNavigate();
    const [credentials, setcredentials] = useState({ email:" ",password: ""});
    const handleOnSubmit = async (e) =>{
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              },
              body: JSON.stringify({email:credentials.email,password:credentials.password})
          });
          const json = await response.json()
          if(json.success){
            localStorage.setItem('token',json.authtoken);
            navigate("/");
          }
          else{
            alert("invalid credentials")
          }
    }
    const onChange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value });
      };
  return (
    <div>
      <div className="container" style={{marginTop:'15%'}}>
      <h2 className="my-5" style={{fontWeight:'bold', fontFamily:'Poppins'}}>Login To Continue To iNotebook</h2>
        <form onSubmit={handleOnSubmit} >
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={credentials.email}
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
              value={credentials.password}
              className="form-control"
              id="password"
              name="password"
              style={{ border: "none",borderBottom: "1px solid #000", background: "none" ,boxShadow: "none"}}
            />
          </div>
          <button type="submit" className="btn btn-dark">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
