import '../css/navBar.css';
import React from 'react';
import {NavLink, useParams} from 'react-router-dom';

export default function NavBar(){    
  const  params  = useParams();
  console.log(params);
  return( 
    <nav className="nav-container">
      <NavLink className="link"to="/home"><h1><button>Home</button></h1></NavLink>
    </nav>
  )
}


