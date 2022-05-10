const { Router } = require('express');
const router = Router();
const axios = require('axios');
const {Recipe, Diet} = require('../db.js');
const {Op} = require('sequelize');
const {
  API_KEY,
} = process.env;

// [ ] GET /recipes?name="...":
// Obtener un listado de las recetas que contengan la palabra ingresada como query parameter
// Si no existe ninguna receta mostrar un mensaje adecuado
router.get("/", async (req, res, next) => {
  const{name} = req.query;
    try{
        const receta = await axios.get("https://api.spoonacular.com/recipes/complexSearch?number=2&query="+name+"&apiKey="+API_KEY)
        const recetasApi =(receta.data.results)
        const recetasDB = await Recipe.findAll({
          where:{
            name : {
              [Op.iLike]: "%"+ name +"%"
            }
          }
        })
        const recetas = [...recetasApi,...recetasDB]
      if (name && recetas.length){
        return res.send(recetas)
      }     
      else if (name && recetas.length === 0){
        return res.status(404).send("no hay recestas con este ?name = "+name)
      }
      else {
        const allRecipes = await axios.get("https://api.spoonacular.com/recipes/complexSearch?number=2&apiKey="+API_KEY)
        const allRecipesInArray = allRecipes.data.results
        return res.send(allRecipesInArray)
      }
    }catch(err){
      next(err);
    }
})
// [ ] GET /recipes/{idReceta}:
// Obtener el detalle de una receta en particular
// Debe traer solo los datos pedidos en la ruta de detalle de receta
// Incluir los tipos de dieta asociados
router.get("/:idReceta", async (req, res, next) => {
  const{idReceta} = req.params;
    try{
      if (idReceta && idReceta.length <= 7){      
        const detail = await axios.get("https://api.spoonacular.com/recipes/"+idReceta+"/information?includeNutrition=false&apiKey=880cf0e63ea24415abdbfa6aab1b7b8a") 
        const filterDetail = {
          source: "https://api.spoonacular.com/recipes/",
          id: detail.data.id,
          name: detail.data.title,
          image: detail.data.image,
          imageType: detail.data.imageType,        
          diets: detail.data.diets,
          summary: detail.data.summary,
          score: detail.data.spoonacularScore,
          healthScore: detail.data.healthScore,
          instructions: detail.data.instructions              
        } 
        return res.send(filterDetail);
      }
      else if(idReceta && idReceta.length > 7){
        const detailDb = await Recipe.findOne(
          { where: {id: idReceta},
          include: {
            model: Diet,
            attributes: ["id", "name"],
            through:{
              attributes: []
            }
          }})
        if (detailDb){
          detailDb.source = "base de datos food"
          return res.send(detailDb)
        }
        else {
          return res.status(404).send("no existe esta /:idReceta --> "+idReceta)
        }        
      }
    }catch(err){
      next(err);
    }
});
// Recibe los datos recolectados desde el formulario controlado de la ruta de creación de recetas por body
// Crea una receta en la base de datos
router.post("/", async (req, res, next) => {
  const {name, summary, score, healthScore, instructions, dietsIds} = req.body;
  try{
    const newRecipe = await Recipe.create({name, summary, score, healthScore, instructions})
    for (let i = 0 ; i < dietsIds.length ; i++){
      await newRecipe.addDiet(dietsIds[i])
    }
    res.send(newRecipe)
  }
  catch(err){
    next(err);
  }
})      
module.exports = router;
