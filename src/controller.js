import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "core-js/stable";
import "regenerator-runtime/runtime";
import { addBookmark, deleteBookmark, getSearchResultsPage, loadRecipes, loadSearchResults, state, updateServings } from "./model.js";
import recipeView from "./view/recipeView";
import searchView from "./view/searchView.js";
import resultsView from "./view/resultsView.js";
import paginationView from "./view/paginationView.js";

const showRecipe = async () => {
  try {
    let id = window.location.hash.slice(1);
    //console.log(id);

    if (!id) return;

    // let sp = recipeView.renderSpinner()
    // console.log(sp)

    recipeView.renderSpinner();

    await loadRecipes(id);

    recipeView.render(state.recipe);  
  } catch (err) {
    console.log(err);
    recipeView.renderError();
  }
};

const controlSearchData = async () => {
  try {
    resultsView.renderSpinner();
    //console.log(resultsView)
    const query = searchView.getQuery();

    if (!query) return;

    await loadSearchResults(query);
    //console.log(state.search.results)

    //resultsView.render(state.search.results);
    //render based on pagination
    resultsView.render(getSearchResultsPage()) 

    resultsView.addHandlerActive()

    paginationView.render(state.search)

   

  } catch (err) {
    console.log(err);
  }
};


const controlPagination = (page) => {
   //render based on pagination
  resultsView.render(getSearchResultsPage(page))

  paginationView.render(state.search)
}

const controlServings = (newServings) => {
  updateServings(newServings)

   //recipeView.render(state.recipe)
  // update only part of servings and whole dom should not re-render
  recipeView.render(state.recipe) 
}

const controlAddBookmark = () => {
  if (!state.recipe.bookmarked){
    addBookmark(state.recipe)
  }else{
    deleteBookmark(state.recipe.id)
  }

  recipeView.render(state.recipe)
  console.log(state.recipe)
}


const init = () => {
  recipeView.addHandlerRender(showRecipe);
  searchView.addSearchHandler(controlSearchData);
  paginationView.addPaginationHandler(controlPagination)
  recipeView.addHandlerServings(controlServings)
  recipeView.addHandlerBookmark(controlAddBookmark)
};

init();
