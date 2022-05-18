import {useDispatch, useSelector} from "react-redux"
import {useState, useEffect} from "react"
import {addNewRecipe, getDiets} from '../store/actions'

export function validate(input) {
    let errors = {};
    if (!input.name) {
      errors.name = '*Name is required'
    }else if (input.name.length > 60){
      errors.name = '*must contain less than 60 characters'
    }else if (!/^[a-z ,.'-]+$/i.test(input.name)){//no acepta los acentos
      errors.name = '*the name must not contain symbols'
    }   
    if (!input.summary){
      errors.summary = '*write a summary describing your recipe'
    }else if (input.summary.length > 400){
      errors.instructions = '*must not exceed 400 characters'
    }
    if (!input.score){
        errors.score = '*rate your recipe with a number from 1 to 100'
    }else{
      if(!Number.isNaN(Number(input.score))){
        if (input.score < 1 || input.score > 100){
          errors.score = '*the number must be from 1 to 100'
        }       
      }else{
        errors.score = '*must be a number'
      }
    }
    if (!input.healthScore){
        errors.healthScore = '*rate your recipe with a number from 1 to 100'
    }else{
      if(!Number.isNaN(Number(input.healthScore))){
        if (input.healthScore < 1 || input.healthScore > 100){
          errors.healthScore = '*the number must be from 1 to 100'
        }       
      }else{
        errors.healthScore = '*must be a number'
      }
    }
    if (!input.instructions){
      errors.instructions = '*write your recipe instructions'
    }else if (input.instructions.length > 400){
      errors.instructions = '*must not exceed 400 characters'
    }
    if (!input.dietsIds.length){
        errors.dietsIds = '*select types of diets'
    }
    return errors;
};
export default function  Formulario() {
  const [input, setInput] = useState({
    name:"", 
    summary:"", 
    score:"", 
    healthScore:"", 
    instructions:"", 
    dietsIds:[]
  });
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getDiets())
  },[])
  const diets = useSelector(state => state.diets)
  const handleInputChange = function(e){
    setInput({
        ...input,
        [e.target.name]: e.target.value,
    });
  }
  const [msgAlert, setMsgAlert] = useState({
    mostrar: false
  });
  const handleSubmit = function(e){
    e.preventDefault()   
    if (!Object.keys(validate(input)).length){
      dispatch(addNewRecipe(input))
      setInput({
        name:"", 
        summary:"", 
        score:"", 
        healthScore:"", 
        instructions:"", 
        dietsIds:[]
      });
      setMsgAlert({
        mostrar: false
      })
      //redirigir aqui: ?????
    }else{
      setMsgAlert({
        mostrar: true
      })
    }
  }
  const selectDiets = function(dieta){
    let existeId = input.dietsIds.some(id => id === dieta)
    if(!existeId){
    setInput({
        ...input,
        dietsIds:[...input.dietsIds,dieta]
    }); 
    }
    else {
    setInput({ 
        ...input, dietsIds: 
        input.dietsIds.filter((id)=>id !== dieta)
    }); 
    } 
  }
  return (
  <>
    <form onSubmit={(e) => {handleSubmit(e)}} >
      <div>
        <label>Name:</label>     
        <input type="text" name="name" value={input.name} onChange={handleInputChange} />    
         {validate(input).name && <p className="danger">{validate(input).name}</p>}           
      </div>
      <div>
        <label>summary:</label>     
        <input type="text" name="summary" value={input.summary} onChange={handleInputChange} />
        {validate(input).summary && <p>{validate(input).summary}</p>}                
      </div>
      <div>
        <label>score:</label>     
        <input type="text" name="score" value={input.score} onChange={handleInputChange} />
        {validate(input).score && <p>{validate(input).score}</p>}                  
      </div>
      <div>
        <label>healthScore:</label>     
        <input type="text" name="healthScore" value={input.healthScore} onChange={handleInputChange} />
        {validate(input).healthScore && <p>{validate(input).healthScore}</p>}                  
      </div>
      <div>
        <label>instructions:</label>     
        <input type="text" name="instructions" value={input.instructions} onChange={handleInputChange} />
        {validate(input).instructions && <p>{validate(input).instructions}</p>}                  
      </div>
      <div>         
      </div> 
      <div>
        <input type="submit" value="submit"/>
        {msgAlert.mostrar && <p>*complete correctamente el formulario</p>} 
      </div>
    </form>
    <div>
        <label>diets:</label>  
        {validate(input).dietsIds&& <p>{validate(input).dietsIds}</p>}   
        <ul>
         {diets && diets.map(diet => 
           <li key = {diet.id}> 
             <button onClick = {()=> selectDiets(diet.id)}>  
             {diet.name}
             </button>
           </li>)
         }
        </ul>                   
      </div>
  </>   
  )
}

