import React from 'react';
import '../css/loading.css';
import LoadingGif from '../img/loader.gif'

export default function Loading() {
    return (
      <>
       <div className="landingPage-container" id="loading-cotainer">
           <div><h1>Cargando...</h1></div>
           <img src={LoadingGif} width="20%" height="50%"/>
       </div>
       
      </>
    );
};