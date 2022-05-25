const { Router } = require('express');
const router = Router();
const {Diet} = require('../db.js');


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

