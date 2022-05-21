import {useDispatch, useSelector} from "react-redux"
import {useEffect, useState,} from "react"
import {orderBy, getByFind, resetError} from '../store/actions'
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
  const [orderPress, setOrderPress] = useState({healthScore:"",name:""});
  const changeOrder = (atribute,value,orderFunction)=>{
    dispatch(orderBy(orderFunction(recipes,atribute)))
    setOrderPress({
      ...orderPress,
      healthScore:"",name:"",
      [atribute]:value
    })
  }
  ////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////Find By Name////////////////////////////////////////////////
  const error = useSelector(state => state.error)
  const [input, setInput] = useState({find:""});
  const handleInputChange = function(e){
    setInput({
      ...input,
      find : e.target.value
    });
  }
  const find=()=>{
    dispatch(resetError())
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
       <NavLink className="link"to="/home/new"><button className="button-a">Create new recipe</button></NavLink>
        <button className="button-a"onClick = {()=>find()}>Find Recipe</button>
        {error[1]==="Error Find"&&<p id="find-not-found">No results were found for your search.</p>}
        {error[1]==="Error Find"&& !!setTimeout(() => {dispatch(resetError())}, 4000)}
        <input className="input-a"type="text" name="name" value={input.find} onChange={(e)=>handleInputChange(e)} placeholder="Search recipes..."/>
      </div>
        <div className="order-left">
          <label className="label">Order by HealthScore:</label>
          {orderPress.healthScore === "Desc"&&<button className="button-a press-button"onClick = {()=>changeOrder("healthScore","Desc",Desc)}>Highest</button>}
          {orderPress.healthScore === "Desc"&&<button className="button-a"onClick = {()=>changeOrder("healthScore","Asc",Asc)}>Lowest</button>}
          {orderPress.healthScore === "Asc"&&<button className="button-a"onClick = {()=>changeOrder("healthScore","Desc",Desc)}>Highest</button>}
          {orderPress.healthScore === "Asc"&&<button className="button-a press-button"onClick = {()=>changeOrder("healthScore","Asc",Asc)}>Lowest</button>}
          {orderPress.healthScore === ""&&<button className="button-a"onClick = {()=>changeOrder("healthScore","Desc",Desc)}>Highest</button>}
          {orderPress.healthScore === ""&&<button className="button-a"onClick = {()=>changeOrder("healthScore","Asc",Asc)}>Lowest</button>}
        </div>                                       
        <div className="order-left">
          <label className="label">Order by Name:</label>
          {orderPress.name === "Desc"&& <button className="button-a press-button"onClick = {()=>changeOrder("name","Desc",Desc)}>Z-A</button>}
          {orderPress.name === "Desc"&& <button className="button-a"onClick = {()=>changeOrder("name","Asc",Asc)}>A-Z</button>}
          {orderPress.name === "Asc"&& <button className="button-a"onClick = {()=>changeOrder("name","Desc",Desc)}>Z-A</button>}
          {orderPress.name === "Asc"&& <button className="button-a press-button"onClick = {()=>changeOrder("name","Asc",Asc)}>A-Z</button>}
          {orderPress.name === ""&&<button className="button-a"onClick = {()=>changeOrder("name","Desc",Desc)}>Z-A</button>}
          {orderPress.name === ""&&<button className="button-a"onClick = {()=>changeOrder("name","Asc",Asc)}>A-Z</button>}
        </div>        
    </div>
  )
}

// {!!error.length&& setTimeout(() => {dispatch(resetError())}, 3000)}