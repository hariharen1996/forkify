import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'core-js/stable'
import 'regenerator-runtime/runtime'

let recipeEl = document.querySelector('.recipe')

const timeout = (sec) => {
    return new Promise((_,reject) => {
        setTimeout(() => {
            reject(`Request took too long! Timeout after ${sec} second`)
        },sec * 1000)
    })
}


const renderSpinner = (parentElement) => {
    const dom = `
        <div class="d-flex justify-content-center">
            <div class="spinner-border text-warning" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
    `

    parentElement.innerHTML = ''
    parentElement.insertAdjacentHTML('afterbegin',dom)
}


const showRecipe = async () => {
    try{

        renderSpinner(recipeEl)

        const response = await fetch('https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886')
        const data = await response.json()

        if(!response.ok) throw new Error(`${data.message} ${response.status}`)

        //console.log(data)
        let { recipe } = data.data
        recipe = {
            id: recipe.id,
            imageURL: recipe.image_url,
            cookingTime: recipe.cooking_time,
            sourceURL: recipe.source_url,
            servings: recipe.servings,
            title: recipe.title,
            publisher: recipe.publisher,
            ingredients: recipe.ingredients
        }

        let dom = `<img src=${recipe.imageURL} class="recipe-img card-img-top img-fluid w-100 recipe-img" alt="image">
          <div class="card-body">
            <h5 class="card-title recipe-title">${recipe.title}</h5>
            <div class="d-flex flex-column flex-sm-row justify-content-sm-between align-items-sm-center">
                <div class="servings-btn-container mt-2">
                      <i class="fas fa-plus-circle" id="recipePlus"></i>
                      <i class="fas fa-minus-circle" id="recipeMinus"></i>
                </div>
                <div class="d-flex gap-2 mt-3">   
                  <div class="d-flex gap-2 minutes-container">
                    <i class="fas fa-clock mt-1"></i>  
                    <p><span id="recipeMin">${recipe.cookingTime}</span>  Minutes</p>
                  </div>
                  <div class="d-flex gap-2 servings-container">
                    <i class="fas fa-users-cog mt-1"></i> 
                    <p><span id="recipeServings">${recipe.servings}</span> Servings</p>
                  </div>
                </div>
                <div class="recipe-bookmarks">
                    <i class="fas fa-user" id="recipeUser"></i>
                    <i class="far fa-bookmark" id="recipeBookmark"></i>
                </div>
            </div>
      
            <div class="recipe-container" id="recipeIngredients">
               <h5 class="mt-3">Recipe Ingredients</h5>
               <div class="mt-3">
                   ${recipe.ingredients.map((item) => {
                        return(
                            `<div>
                                <p>Quanityt: ${item.quantity}</p>
                                <p>Unit: ${item.unit}</p>
                                <p>Description: ${item.description}</p>
                             </div>`
                        )
                   })}  
               </div>
            </div>
          </div>`

          recipeEl.insertAdjacentHTML('afterbegin',dom)

    }catch(err){
        console.log(err)
    }
} 


showRecipe()