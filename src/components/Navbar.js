import React from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
function Navbar() {
  const location = useLocation();
  let navigate = useNavigate();
  const handlelogout=()=>{
    localStorage.removeItem('token');
    navigate('/login')
  }
  return (
    <nav className="navbar fixed-top navbar-expand-lg bg-body-tertiary "> 
  <div className="container-fluid">
    <img src="logo4.jpg" style={{width:'12%'}} alt="..." />
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname === '/' ? 'active' :''}`} aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname === '/About' ? 'active' : ''}`} to="/About">About</Link>
        </li>
      </ul>
      {!localStorage.getItem('token')?<form className=' d-flex align-items' >
      <Link className={`nav-link ${location.pathname === '/login' ? 'active' :''} mx-2 my-1`} aria-current="page" to='/login' >Login</Link>
      <Link className={`nav-link ${location.pathname === '/signup' ? 'active' :''} mx-2 my-1`} aria-current="page" to="/signup" >Signup</Link>
      </form>: <button className='btn btn-light' onClick={handlelogout} >Logout</button>
    }
    </div>
  </div>
</nav>
  )
}

export default Navbar
