import './App.css';
import React from "react";
import Formulario from './components/formulario';
import Recipes from './components/recipes';
import NavBar from './components/navBar';
import Detail from './components/detail';
import Loading from './components/loading';
import NotFoundError from './components/404'
import {Routes,Route} from "react-router-dom";
import LandingPage from './components/landingPage'

function App() {
  return (
    <div>
      <NavBar/>
        <Routes>   
          <Route path="/" element={<LandingPage/>}/>           
          <Route path="/home" element={<Recipes/>} />   
          <Route path="/home/new" element={<Formulario/>}/>
          <Route path="/home/detail/:id" element={<Detail/>} />     
          <Route path="*" element={<NotFoundError/>}/>   
        </Routes>                     
     </div>
  );
}
export default App;

