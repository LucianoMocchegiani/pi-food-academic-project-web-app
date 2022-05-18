import {useDispatch, useSelector} from "react-redux"
import {useEffect, useState,} from "react"
import {orderBy, getByFind} from '../store/actions'
import React from 'react';
import {NavLink} from 'react-router-dom';

export default function SelectBar(){    
  const dispatch = useDispatch()
  const recipes = useSelector(state => state.recipes)
   ///////////////////////////////////////////////////////////////////////////////////////////////
 ////////////////////////////////////Orders///////////////////////////////////////////////////////
  const Desc =(arrayDeObj,atribute)=>{
    let arrayObj =  arrayDeObj.sort(function (a, b) {
      if (a[atribute] < b[atribute] ) {
        return 1;
      }
      if (a[atribute] > b[atribute]) {
        return -1;
      }
      // a must be equal to b
      return 0;
    });
    let newArrayObj = [...arrayObj]
    return newArrayObj
  }
  const Asc =(arrayDeObj,atribute)=>{
    let arrayObj =  arrayDeObj.sort(function (a, b) {
      if (a[atribute] > b[atribute] ) {
        return 1;
      }
      if (a[atribute] < b[atribute]) {
        return -1;
      }
      // a must be equal to b
      return 0;
    });
    let newArrayObj = [...arrayObj]
    return newArrayObj
  }
  ////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////Find By Name////////////////////////////////////////////////
  const [input, setInput] = useState({find:""});
  const handleInputChange = function(e){
    setInput({
      ...input,
      find : e.target.value
    });
  }
  const find=()=>{
    dispatch(getByFind(input.find))
    setInput({
      ...input,
      find : ""
    });
  }
  ////////////////////////////////////////////////////////////////////////////////////////////////
  return( 
    <div>
       <div className="order-right">
        <button className="button-a"><NavLink className="link"to="/new" >Create new recipe</NavLink></button>
        <button className="button-a"onClick = {()=>find()}>Find Recipe</button>
        <input className="input-a"type="text" name="name" value={input.find} onChange={(e)=>handleInputChange(e)}/>
      </div>
        <div className="order-left">
          <label className="label">Order by HealthScore:</label>
          <button className="button-a"onClick = {()=>dispatch(orderBy(Desc(recipes,"healthScore")))}>Highest</button>
          <button className="button-a"onClick = {()=>dispatch(orderBy(Asc(recipes,"healthScore")))}>Lowest</button>
        </div>
        <div className="order-left">
          <label className="label">Order by Name:</label>
          <button className="button-a"onClick = {()=>dispatch(orderBy(Desc(recipes,"name")))}>Z-A</button>
          <button className="button-a"onClick = {()=>dispatch(orderBy(Asc(recipes,"name")))}>A-Z</button>         
        </div>        
    </div>
  )
}
