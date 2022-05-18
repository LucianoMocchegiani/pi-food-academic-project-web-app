import '../css/navBar.css';
import React from 'react';
import {NavLink} from 'react-router-dom';
export default function NavBar(){    

  return( 
    <nav className="nav-container">
      <h1><button><NavLink className="link"to="/" >Home</NavLink></button></h1>
    </nav>
  )
}


