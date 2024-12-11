import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "core-js/stable";
import "regenerator-runtime/runtime";
import { loadRecipes, state } from "./model.js";
import recipeView from "./view/recipeView";


const showRecipe = async () => {
  try {
    let id = window.location.hash.slice(1);
    console.log(id);

    if (!id) return;

    // let sp = recipeView.renderSpinner()
    // console.log(sp)

    recipeView.renderSpinner();

    await loadRecipes(id);

    recipeView.render(state.recipe);
  } catch (err) {
    console.log(err);
    recipeView.renderError()
  }
};

const init = () => {
    recipeView.addHandlerRender(showRecipe())
}

init()