import { API_URL, RES_PER_PAGE } from "./config";
import { getJSON } from "./helpers";

export const state = {
  recipe: {},
  search: {
    query: "",
    results: [],
    page: 1,
    resultsPerPage: RES_PER_PAGE
  },
  bookmarks: []
};

export const loadRecipes = async (id) => {
  try {
    const data = await getJSON(`${API_URL}/${id}`);

    //console.log(data)
    let { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      imageURL: recipe.image_url,
      cookingTime: recipe.cooking_time,
      sourceURL: recipe.source_url,
      servings: recipe.servings,
      title: recipe.title,
      publisher: recipe.publisher,
      ingredients: recipe.ingredients,
    };

    //console.log(recipe)

    let isBookmarked = state.bookmarks.some(bookmark => bookmark.id === id)
    if(isBookmarked){
      state.recipe.bookmarked = true 
    }else{
      state.recipe.bookmarked = false
    }

    //console.log(state.recipe)

  } catch (err) {
    //console.log(err)
    throw err;
  }
};

export const loadSearchResults = async (query) => {
  try {
    state.search.query = query;
    const data = await getJSON(`${API_URL}?search=${query}`);
    //console.log(data)

    state.search.results = data.data.recipes.map((items) => {
      return {
        id: items.id,
        title: items.title,
        publisher: items.publisher,
        imageURL: items.image_url,
      };
    });

    //console.log(state.search.results)
  } catch (err) {
    console.log(err);
  }
};



export const getSearchResultsPage = (page = state.search.page) => {
    state.search.page = page
    let start = (page - 1) * state.search.resultsPerPage
    let end = page * state.search.resultsPerPage
    //console.log(start,end)
    return state.search.results.slice(start,end)
}

export const updateServings = (newServings) => {
    //newquantity = oldQty * newServings / oldServings

    console.log(newServings)
    console.log(state.recipe)

    state.recipe.ingredients.forEach((item) => {
      item.quantity = (item.quantity * newServings) / state.recipe.servings
    })

    state.recipe.servings = newServings
}

export const addBookmark = (recipe) => {
  state.bookmarks.push(recipe)

  if(recipe.id === state.recipe.id) state.recipe.bookmarked = true
}


export const deleteBookmark = (id) => {
  const index = state.bookmarks.findIndex(items => items.id === id)
  state.bookmarks.splice(index,1)

  if(id === state.recipe.id) state.recipe.bookmarked = false
}