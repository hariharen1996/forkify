import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "core-js/stable";
import "regenerator-runtime/runtime";
import { getSearchResultsPage, loadRecipes, loadSearchResults, state } from "./model.js";
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
    resultsView.render(getSearchResultsPage()) //render based on pagination

    resultsView.addHandlerActive()

    paginationView.render(state.search)

   

  } catch (err) {
    console.log(err);
  }
};


const controlPagination = (page) => {
  resultsView.render(getSearchResultsPage(page)) //render based on pagination

  paginationView.render(state.search)
}

const init = () => {
  recipeView.addHandlerRender(showRecipe);
  searchView.addSearchHandler(controlSearchData);
  paginationView.addPaginationHandler(controlPagination)
};

init();
