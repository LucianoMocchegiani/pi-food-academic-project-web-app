const { Router } = require('express');
const router = Router();
const {Diet} = require('../db.js');

// [ ] GET /types:
// Obtener todos los tipos de dieta posibles
// En una primera instancia, cuando no exista ninguno, deberán precargar la base de datos con los tipos de datos indicados por spoonacular acá
router.get("/",async (req, res, next) => {
    try{
        const diets = await Diet.findAll()
        res.send(diets)
    }
    catch(err){
        next(err);
    }
})
module.exports = router;

