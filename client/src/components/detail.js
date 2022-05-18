import React from 'react';
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import {getRecipeDetail} from '../store/actions'
import {useParams} from "react-router-dom"

export default function Detail(){
    const  id  = useParams().id;
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getRecipeDetail(id))
    },[id])
    const recipeDetail = useSelector(state => state.recipeDetail) 
    return (
      <>
        {(!Object.keys(recipeDetail).length)&&<div>Cargando...</div>}
        {(!!Object.keys(recipeDetail).length)&&
        <div className="detail">        
          <h5>{recipeDetail.name}</h5>          
          <div className="card-body">
            <img  src={recipeDetail.image}  alt="recipe image" />
          </div>
          <div>
          <h5>Score {recipeDetail.score}</h5>
          </div>
          <div>
          <h5>HealthScore {recipeDetail.healthScore}</h5>
          </div>
          <div>summary<p>{recipeDetail.summary}</p></div>
          <div>instructions<p>{recipeDetail.instructions}</p></div>
          <div>Diets{recipeDetail.diets.length && 
             <ul>{recipeDetail.diets.map(diet =><li key={diet}>{diet}</li>)}</ul>}
          </div>   
        </div>}
      </>
    );
   
}


