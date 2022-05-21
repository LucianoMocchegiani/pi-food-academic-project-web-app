import React from "react"
import '../css/404.css';
import Error404 from '../img/404.png'

export default function  NotFoundError() {
    return(
        <div className="landingPage-container"id="container-404">
            <div><h1>Error 404</h1></div>
            <img src={Error404} width="20%" height="36%"/>
            <div><h2>Not Found</h2></div>
            
        </div>
    )
}
