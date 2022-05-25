const { Router } = require('express');
const recipesRouter = require('./recipes')
const typesRouter = require('./types')
const router = Router();


router.use('/recipes', recipesRouter)
router.use('/types', typesRouter)

module.exports = router;


