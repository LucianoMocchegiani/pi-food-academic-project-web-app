import React from 'react';
import '../css/cardRecipe.css';
import {Link} from 'react-router-dom';
import Icon from '../img/corazon-dorado.png'

export default function CardRecipe ({id,name,image,score,healthScore,diets}) {
    return (
      <>
      <div style = {{backgroundImage: "url("+image+")"}}className="card">
        <Link className="link"to={`/${id}`} >
          <h3 className="card-title">{name}</h3>
          <div className="icon-container">
            <img src={Icon} alt="icon"/>
            <h3>{healthScore}</h3>
          </div>
          <div>
            <ul className="diets-container" >{diets.map(diet =>
              <li key={diet}>{diet}</li>)}
            </ul>
          </div>       
        </Link>
      </div>
      </>
    );
};

