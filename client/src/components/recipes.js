import {React, useState} from 'react';
import {useDispatch, useSelector} from "react-redux"
import {useEffect} from "react"
import {getRecipes, getDiets} from '../store/actions'
import CardRecipe from '../components/cardRecipe'
import SelectBar from '../components/selectBar'
import Loading from '../components/loading'
import NotFoundError from '../components/404'
import '../css/recipes.css';


export default function Recipes(){
    ////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////Global State//////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    const recipes = useSelector(state => state.recipes)
    const diets = useSelector(state => state.diets)
    const dispatch = useDispatch()
    useEffect(() => {
      dispatch(getRecipes())
      dispatch(getDiets())
    },[])
    ////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////Paginado/////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    const [recipesPage, setRecipesPage] = useState({
      actualyPage:[],
      page:1,
      countRecipes: 0,
    }); 
    useEffect(() => {
      if (recipes.length){
        nineRecipes(1)
      }
    },[recipes])
    ///////////////////////Botonera Paginado////////////////////////////////////////////
    const buttons=()=>{
      let totalPages =[]
      if (dietsFilter !== "Any"){
        let arrayFilterByDiet = filterByDiets()
        totalPages = Math.ceil(arrayFilterByDiet.length/9)
      }else{
        totalPages = Math.ceil(recipes.length/9)       
      }
      const totalPagesArray =[]
      for (let i = 1; i < totalPages+1; i++){
        totalPagesArray.push(i)
      }
      if(totalPagesArray.length>1){
        totalPagesArray.unshift("Previous")
        totalPagesArray.push("Next")
      }
      return totalPagesArray
    }
    ///////////////////////Funcion Paginadora///////////////////////////////////////////
    const nineRecipes=(pag=1)=>{  
      const changePages =() =>{
        let range = (pag*9)-9
        let arrayRecipes = []
        if ((dietsFilter !== "Any")){
          let arrayFilterByDiet = filterByDiets()
          for (let i = range; i < range+9;i++){
            arrayRecipes.push(arrayFilterByDiet[i])
          }       
        }else{
          for (let i = range; i < range+9;i++){
            arrayRecipes.push(recipes[i])
          } 
        }
        setRecipesPage({
          ...recipesPage,
          countRecipes: range,
          page: pag,
          actualyPage: [...arrayRecipes]
        });
      }
      if(pag === "Previous"){
        if(recipesPage.page < 2){
          pag = 1
          changePages()
        }
        else{
          pag = recipesPage.page-1
          changePages()
        }
      }else if(pag === "Next"){
        if(recipesPage.page > buttons().length-3){
          pag = buttons().length-2
          changePages()
        }
        else{
          pag = recipesPage.page+1
          changePages()
        }
      }else{
        changePages()
      }      
    }
    ///////////////////////Filter by diets//////////////////////////////////////////////
    const [dietsFilter, setDietsFilter] = useState("Any"); 
    const filterByDiets = ()=>{       
      let arrayFilterByDiet= recipes.filter(recipe => recipe.diets.includes(dietsFilter))
      return  arrayFilterByDiet 
    }
    const dietFilterChange = function(e){
      setDietsFilter(e.target.value);
    }
    useEffect(() => {
      console.log(dietsFilter)
      nineRecipes(1)
    },[dietsFilter])
    ////////////////////////////////////////////////////////////////////////////////////
    useEffect(() => {
      console.log(recipesPage.actualyPage)
    },[recipesPage.actualyPage])
    return(
      <>
        {!recipes.length&&<Loading/>}
        {!!recipes.length&& 
        <div>
          <div className="buttons-order-container">
          <div className="order-left">
            <label className="label">Filter by Diet </label>
            <select className="button-a" name="diets" id="diets" onChange={(e)=>dietFilterChange(e)}>
              <option key="Any" value={"Any"} >Any</option>
              {diets.map(diet=> 
              <option key={diet.name} value={diet.name}>{diet.name}</option>)}
            </select>
          </div>
          <SelectBar/>
          </div>
          {!recipesPage.actualyPage.length&&nineRecipes(1)}
          {recipesPage.actualyPage[0]===undefined&&<p id="recipes-not-found">No recipes were found with the {dietsFilter} diet.</p>}
          <div className="cards-conteiner">
            {recipesPage.actualyPage.map(recipe => 
             (!!recipe)&&
              <CardRecipe 
               key = {recipe.id}
               name={recipe.name}
               image={recipe.image}
               id={recipe.id}
               score={recipe.score}
               healthScore={recipe.healthScore}
               diets={recipe.diets}
              />
            )}
          </div>
          <div className="buttons-a-container">
              {buttons().map(button => 
                <div key={button }>
                  {recipesPage.page !== button && <button className="button-a"onClick={()=>nineRecipes(button )}>{button }</button>}
                {recipesPage.page === button && <button className="button-a press-button"onClick={()=>nineRecipes(button )}>{button }</button>}
                </div>
              )}          
          </div>
        </div>}
      </>
    );
}



