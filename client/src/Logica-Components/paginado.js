

    if ((dietsFilter !== "Any")){
        let arrayFilterByDiet = filterByDiets()
        for (let i = range; i < range+9;i++){
        actualyCardsRender.push(arrayFilterByDiet[i])
        }       
    }
    if (dietsFilter !== "Any"){
        let arrayFilterByDiet = filterByDiets()
        totalPages = Math.ceil(arrayFilterByDiet.length/9)}

    const buttonsPaginado=(cardsArray,numCardsbyPag)=>{
        let totalPages =[]
        totalPages = Math.ceil(cardsArray.length/numCardsbyPag)       
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

    const paginando =(pag,numCardsbyPag,cardsArray) =>{
        let range = (pag*numCardsbyPag)-numCardsbyPag
        let actualyCardsRender = []
    
        for (let i = range; i < range+9;i++){
        actualyCardsRender.push(cardsArray[i])
        } 
        return{
        page: pag,
        actualyCardsRender: [...arrayActualyPage]
        }
    }
    
    const conectStatePaginado = (pag)=>{
        const paginando = paginando(pag,9,recipes)
        setRecipesPage({
            ...recipesPage,
            page: paginando.page,
            actualyPage: paginando.actualyCardsRender
        });
    }
  


    const changePages=(pag,changePages)=>{  
        if(pag === "Previous"){
          if(recipesPage.page < 2){
            pag = 1
            conectStatePaginado(pag)
          }
          else{
            pag = recipesPage.page-1
            conectStatePaginado(pag)
          }
        }else if(pag === "Next"){
          if(recipesPage.page > buttons().length-3){
            pag = buttons().length-2
            conectStatePaginado(pag)
          }
          else{
            pag = recipesPage.page+1
            conectStatePaginado(pag)
          }
        }else{
            conectStatePaginado(pag)
        }      
    }