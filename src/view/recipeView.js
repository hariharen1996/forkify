import { Fraction } from "fractional"


class RecipeView{
    _parentElement = document.querySelector('.recipe')
    _data


    render(data){
        this._data = data
        let dom = this._generateDOM()
        this._clear()
        this._parentElement.insertAdjacentHTML('afterbegin',dom)
    }

    _clear(){
        this._parentElement.innerHTML = ''
    }

    addHandlerRender(handler){
        ["load", "hashchange"].forEach((event) => window.addEventListener(event, handler));
    }

    renderSpinner(){
        return `
        <div class="d-flex justify-content-center">
            <div class="spinner-border text-warning" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
    `
    }

    _generateDOM(){
        return `<img src=${this._data.imageURL} class="recipe-img card-img-top img-fluid w-100 recipe-img" alt="image">
        <div class="card-body">
          <h5 class="card-title recipe-title">${this._data.title}</h5>
          <div class="d-flex flex-column flex-sm-row justify-content-sm-between align-items-sm-center">
              <div class="servings-btn-container mt-2">
                    <i class="fas fa-plus-circle" id="recipePlus"></i>
                    <i class="fas fa-minus-circle" id="recipeMinus"></i>
              </div>
              <div class="d-flex gap-2 mt-3">   
                <div class="d-flex gap-2 minutes-container">
                  <i class="fas fa-clock mt-1"></i>  
                  <p><span id="recipeMin">${this._data.cookingTime}</span>  Minutes</p>
                </div>
                <div class="d-flex gap-2 servings-container">
                  <i class="fas fa-users-cog mt-1"></i> 
                  <p><span id="recipeServings">${this._data.servings}</span> Servings</p>
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
                 ${this._data.ingredients.map(this._generateDOMIngredients).join('')}
             </div>
          </div>
        </div>`
    }

    _generateDOMIngredients(item){
        return `<div>
                    <p>Quanity: ${item.quantity ? new Fraction(item.quantity).toString() : ""}</p>
                    <p>Unit: ${item.unit}</p>
                    <p>Description: ${item.description}</p>
                </div>`
    }

}


export default new RecipeView()