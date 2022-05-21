import React from 'react';
import '../css/cardRecipe.css';
import {Link} from 'react-router-dom';
import Icon from '../img/corazon-dorado.png'
import Default from '../img/recipe-default6.jpg'

export default function CardRecipe ({id,name,image=Default,score,healthScore,diets}) {
    return (
      <>
      <Link className="link linkcard"to={`/home/detail/${id}`} >
      <div style = {{backgroundImage: "url("+image+")"}}className="card">
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
        
      </div>
      </Link>
      </>
    );
};
//{{backgroundImage: "url("+image+")"}}
