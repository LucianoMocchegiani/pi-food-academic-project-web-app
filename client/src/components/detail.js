import React from 'react';
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import {getRecipeDetail,resetRecipeDetail,resetError} from '../store/actions'
import {useParams} from "react-router-dom"
import '../css/detail.css';
import Icon from '../img/corazon-dorado.png'
import Loading from '../components/loading'
import NotFoundError from '../components/404'
import Default from '../img/recipe-default.jpg'

export default function Detail(){
  const  id  = useParams().id;
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(resetError())
    dispatch(getRecipeDetail(id))
    return dispatch(resetRecipeDetail())
  },[id])
  const recipeDetail = useSelector(state => state.recipeDetail)
  const error = useSelector(state => state.error) 
  
  if(error&&error[1]==="Error Detail"){
    return(
      <NotFoundError/>
    )
  }
  else{
  return (
    <>
      {(!Object.keys(recipeDetail).length)&&<Loading/>}
      {(!!Object.keys(recipeDetail).length)&&
      <div id="div-cotainer-all">        
        <label className="detail-title">{recipeDetail.name}</label>          
        <div className="detail-image-div">
          {!recipeDetail.image&&<img src={Default} alt="recipe image" />}
          {!!recipeDetail.image&&<img src={recipeDetail.image} alt="recipe image" />}
        </div>
        <div className="detail-head">
          <div>
            <label>HealthScore:</label>
            <div id="detail-icon-position" className="icon-container">
              <img src={Icon} alt="icon"/>
              <h3>{recipeDetail.healthScore}</h3>
            </div>
          </div>
          <div>
          <label>Diets:</label> {recipeDetail.diets.length && 
          <ul>{recipeDetail.diets.map(diet =><li key={diet}>{diet}</li>)}</ul>}
          </div>
          {recipeDetail.dishTypes&&
          <div>
          <label>DishTypes:</label> {recipeDetail.dishTypes.length && 
          <ul>{recipeDetail.dishTypes.map(dish =><li key={dish}>{dish}</li>)}</ul>}
          </div>}
        </div>
        <div className="detail-body">
          <label>Summary</label>
          <p dangerouslySetInnerHTML={{ __html: recipeDetail.summary}}/>
          <label>Instructions</label>
          <p dangerouslySetInnerHTML={{ __html: recipeDetail.instructions}}/>
        </div>
      </div>}
    </>
  );
  }
}


