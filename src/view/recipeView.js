import { Fraction } from "fractional";
import View from "./view";

class RecipeView extends View {
  _parentElement = document.querySelector(".recipe");
  _errorMessage = "We could not find that recipe. please try another one!";
  _message = "";
  _data;

  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    let dom = this._generateDOM();
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", dom);
  }

  _clear() {
    this._parentElement.innerHTML = "";
  }

  addHandlerRender(handler) {
    ["load", "hashchange"].forEach((event) =>
      window.addEventListener(event, handler)
    );
  }

  addHandlerServings(handler) {
    this._parentElement.addEventListener("click", (e) => {
      let btn = e.target.closest(".servings-btn");
      if (!btn) return;

      //console.log(btn)

      let id = +btn.dataset.serving;
      if (!id) return;

      //console.log(id)
      if (id > 0) handler(id);
    });
  }

  addHandlerBookmark(handler) {
    this._parentElement.addEventListener("click", (e) => {
      const btn = e.target.closest(".bookmark-btn");
      if (!btn) return;

      handler();
    });
  }

  renderSpinner() {
    return `
        <div class="d-flex justify-content-center">
            <div class="spinner-border text-warning" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
    `;
  }

  renderError(message = this._errorMessage) {
    let dom = `
        <div class="message mt-2 mb-5 alert alert-warning d-flex flex-column justify-content-center align-items-center" role="alert">
          <i class="mb-2 fas fa-exclamation-triangle"></i>
          <p class="alert-link">${message}</p>
        </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", dom);
  }

  renderMessage(message = this._message) {
    let dom = `
        <div class="message mt-5 alert alert-light d-flex flex-column justify-content-center align-items-center" role="alert">
          <i class="far fa-smile"></i> 
          <p class="alert-link">${message}</p>
        </div>
      `;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", dom);
  }

  _generateDOM() {
    return `<img src=${
      this._data.imageURL
    } class="recipe-img card-img-top img-fluid w-100 recipe-img" alt="image">
        <div class="card p-3">
          <h5 class="card-title recipe-title">${this._data.title}</h5>
          <div class="d-flex flex-column flex-md-row justify-content-md-between align-items-md-center">
              <div class="servings-btn-container mt-2">
                  <button class="servings-btn plus bg-none" data-serving="${
                    this._data.servings + 1
                  }">
                    <i class="fas fa-plus-circle"></i>
                  </button>
                  <button class="servings-btn minus bg-none" data-serving="${
                    this._data.servings - 1
                  }">
                    <i class="fas fa-minus-circle"></i>
                  </button>
              </div>
              <div class="d-flex gap-2 mt-3">   
                <div class="d-flex gap-2 minutes-container">
                  <i class="fas fa-clock mt-1"></i>  
                  <p><span id="recipeMin">${
                    this._data.cookingTime
                  }</span>  Minutes</p>
                </div>
                <div class="d-flex gap-2 servings-container">
                  <i class="fas fa-users-cog mt-1"></i> 
                  <p><span id="recipeServings">${
                    this._data.servings
                  }</span> Servings</p>
                </div>
              </div>
              <div class="d-flex gap-2">
                <button class="user-btn  ${this._data.key ? "" : "d-none"}">  
                    <i class="fas fa-user m-1"></i>
                </button>  
                  
                <button class="bookmark-btn">  
                  <i class="${
                    this._data.bookmarked
                      ? "fas fa-bookmark"
                      : "far fa-bookmark"
                  } m-1"></i>
                </button>  
              </div>
          </div>
    
          <div class="recipe-container">
             <h5 class="mt-3 text-decoration-underline">Recipe Ingredients</h5>
             <div class="mt-3">
                 ${this._data.ingredients
                   .map(this._generateDOMIngredients)
                   .join("")}
             </div>
          </div>
        </div>`;
  }

  _generateDOMIngredients(item) {
    return `<div class="card mb-2 p-3 bg-light">
                    <p>Quanity: ${
                      item.quantity
                        ? new Fraction(item.quantity).toString()
                        : ""
                    }</p>
                    <p>Unit: ${item.unit}</p>
                    <p>Description: ${item.description}</p>
                </div>`;
  }
}

export default new RecipeView();
