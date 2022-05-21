import React from "react"
import '../css/landingPage.css';
import Flecha from '../img/flecha3.png'

export default function  LandingPage() {
    return(
        <div className="landingPage-container" id="div-landingPage">
            <img src={Flecha} width="13%" height="30%"/>
            <div><h2>Click on home</h2></div>
            <div><h1>PI FOOD</h1></div>
        </div>
    )
}