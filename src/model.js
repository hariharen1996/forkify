import { API_URL, RES_PER_PAGE } from "./config";
import { getJSON } from "./helpers";

export const state = {
  recipe: {},
  search: {
    query: "",
    results: [],
    page: 1,
    perPage: RES_PER_PAGE
  },
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
    let start = (page - 1) * state.search.perPage
    let end = page * state.search.perPage
    console.log(start,end)
    return state.search.results.slice(start,end)
}

