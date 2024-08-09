import '../css/navBar.css';
import React from 'react';
import {NavLink, useLocation} from 'react-router-dom';

export default function NavBar(){    
  const location = useLocation();
  const pathname = location.pathname;
  return( 
    <nav className="nav-container">
      {pathname!=='/'?<>
        <NavLink className="link"to="/"><h1><button className={`nav-container-button ${pathname==='/'?'press':''}`}>Landing</button></h1></NavLink>
        <NavLink className='link' to="/home"><h1><button className={`nav-container-button ${pathname==='/home'?'press':''}`}>Home</button></h1></NavLink>
        <NavLink className="link"to="/home/new"><h1><button className={`nav-container-button ${pathname==='/home/new'?'press':''}`}>Create new recipe</button></h1></NavLink>
      </>:<NavLink className="link"to="/home"><h1><button className={`nav-container-button`}>Ingresar</button></h1></NavLink>}
    </nav>
  )
}


