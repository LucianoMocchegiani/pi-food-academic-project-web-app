import './App.css';
import React from "react";
import Formulario from './components/formulario';
import Recipes from './components/recipes';
import NavBar from './components/navBar';
import Detail from './components/detail';
import {Routes,Route} from "react-router-dom";

function App() {
  return (
    <div>
      <NavBar/>
        <Routes>           
          <Route path="/" element={<Recipes/>} />   
          <Route path="/new" element={<Formulario/>} />
          <Route path="/:id" element={<Detail/>} />   
        </Routes>                     
     </div>
  );
}
export default App;

