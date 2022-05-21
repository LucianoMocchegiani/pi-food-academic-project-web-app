import {useDispatch, useSelector} from "react-redux"
import {useState, useEffect} from "react"
import {addNewRecipe, getDiets} from '../store/actions'
import '../css/formulario.css';
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
    successfully: "",
    alert: ""
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
        successfully: "si",
        alert: "Your recipe was created successfully"
      })
      //redirigir aqui: ?????
    }else{
      setMsgAlert({
        successfully: "no",
        alert:"You must correctly complete the indicated fields"
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
  <div id="form-all-container">
    <div className="elegirDietaContainer">
      <label>Select Diets Types:</label>  
      <div id="div-p-diet-validate">{validate(input).dietsIds&& <p>{validate(input).dietsIds}</p>}</div>   
        {diets && diets.map(diet => 
        <div key={diet.id}>
        {input.dietsIds.includes(diet.id)&&<button id="press-button"onClick = {()=> selectDiets(diet.id)}>{diet.name}</button>}
        {!input.dietsIds.includes(diet.id)&&<button onClick = {()=> selectDiets(diet.id)}>{diet.name}</button>}
        </div>
        )}                      
    </div>
    <form onSubmit={(e) => {handleSubmit(e)}} className="form-container">
      <div>
        <label>Name:</label>     
        <input id="input-text2"type="text" name="name" value={input.name} onChange={handleInputChange}  placeholder="example: milanesa con pure"/>    
         {validate(input).name && <p className="validate">{validate(input).name}</p>}           
      </div>
      <div>
        <label>summary:</label>     
        <input id="input-text1"type="text" name="summary" value={input.summary} onChange={handleInputChange} placeholder="type summary recipe here..."/>
        {validate(input).summary && <p className="validate">{validate(input).summary}</p>}                
      </div>
      <div>
        <label>score:</label>     
        <input id="input-text2"type="text" name="score" value={input.score} onChange={handleInputChange} placeholder="example: 100"/>
        {validate(input).score && <p className="validate">{validate(input).score}</p>}                  
      </div>
      <div>
        <label>healthScore:</label>     
        <input id="input-text2"type="text" name="healthScore" value={input.healthScore} onChange={handleInputChange} placeholder="example: 100"/>
        {validate(input).healthScore && <p className="validate">{validate(input).healthScore}</p>}                  
      </div>
      <div>
        <label>instructions:</label>     
        <input id="input-text1"type="text" name="instructions" value={input.instructions} onChange={handleInputChange} placeholder="type instructions recipe here..."/>
        {validate(input).instructions && <p className="validate">{validate(input).instructions}</p>}                  
      </div>
      <div id="submit">
        {(!!Object.keys(validate(input)).length)&&<input type="submit"value="Create Recipe"/>} 
        {(!Object.keys(validate(input)).length)&&<input id="press-submit-create"type="submit"value="Create Recipe"/>}
        {msgAlert.successfully==="si" && <p className="validate-acepted">{msgAlert.alert}</p>}
        {msgAlert.successfully==="si" && !!setTimeout(() => {setMsgAlert({successfully: "",alert: ""})}, 4000)}
        {msgAlert.successfully==="no" && <p className="validate-failed">{msgAlert.alert}</p>} 
        {msgAlert.successfully==="no" && !!setTimeout(() => {setMsgAlert({successfully: "",alert: ""})}, 4000)}
      </div>
    </form>
  </div>
  </>   
  )
}
