import { API_URL, KEY, RES_PER_PAGE } from "./config";
import { AJAX } from "./helpers";
import addRecipeView from "./view/addRecipeView";
import bookmarkView from "./view/bookmarkView";
import recipeView from "./view/recipeView";

export const state = {
  recipe: {},
  search: {
    query: "",
    results: [],
    page: 1,
    resultsPerPage: RES_PER_PAGE,
  },
  bookmarks: [],
};

const createRecipeObject = (data) => {
  const { recipe } = data.data;
  return {
    id: recipe.id,
    imageURL: recipe.image_url,
    cookingTime: recipe.cooking_time,
    sourceURL: recipe.source_url,
    servings: recipe.servings,
    title: recipe.title,
    publisher: recipe.publisher,
    ingredients: recipe.ingredients,
    ...(recipe.key && { key: recipe.key }),
  };
};

export const loadRecipes = async (id) => {
  try {
    const data = await AJAX(`${API_URL}/${id}?key=${KEY}`);
    //console.log(data)

    state.recipe = createRecipeObject(data);

    //console.log(recipe)

    let isBookmarked = state.bookmarks.some((bookmark) => bookmark.id === id);
    if (isBookmarked) {
      state.recipe.bookmarked = true;
    } else {
      state.recipe.bookmarked = false;
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
    const data = await AJAX(`${API_URL}?search=${query}&key=${KEY}`);
    //console.log(data)

    state.search.results = data.data.recipes
      .filter(
        (item, index, self) => index === self.findIndex((t) => t.id === item.id)
      )
      .map((items) => {
        const isBookmarked = state.bookmarks.some(
          (bookmark) => bookmark.id === items.id
        );
        return {
          id: items.id,
          title: items.title,
          publisher: items.publisher,
          imageURL: items.image_url,
          bookmarked: isBookmarked,
          ...(items.key && { key: items.key }),
        };
      });

    //console.log(state.search.results)
  } catch (err) {
    console.log(err);
  }
};

export const getSearchResultsPage = (page = state.search.page) => {
  state.search.page = page;
  let start = (page - 1) * state.search.resultsPerPage;
  let end = page * state.search.resultsPerPage;
  //console.log(start,end)
  return state.search.results.slice(start, end);
};

export const updateServings = (newServings) => {
  //newquantity = oldQty * newServings / oldServings

  //console.log(newServings);
  //console.log(state.recipe);

  state.recipe.ingredients.forEach((item) => {
    item.quantity = (item.quantity * newServings) / state.recipe.servings;
  });

  state.recipe.servings = newServings;
};

export const persistBookmarks = () => {
  localStorage.setItem("bookmarks", JSON.stringify(state.bookmarks));
};

export const addBookmark = (recipe) => {
  if (!state.bookmarks.some((item) => item.id === recipe.id)) {
    state.bookmarks.push(recipe);
  }

  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;

  persistBookmarks();
};

export const deleteBookmark = (id) => {
  const index = state.bookmarks.findIndex((items) => items.id === id);
  state.bookmarks.splice(index, 1);

  if (id === state.recipe.id) state.recipe.bookmarked = false;

  persistBookmarks();
};

const clearBookmarks = () => {
  localStorage.clear();
};

const init = () => {
  const storage = JSON.parse(localStorage.getItem("bookmarks"));
  if (storage) {
    state.bookmarks = storage;
  }
};

init();

export const uploadRecipes = async (newRecipes) => {
  console.log(Object.entries(newRecipes));
  try {
    const ingredients = Object.entries(newRecipes)
      .filter((rec) => rec[0].startsWith("ingredient") && rec[1] !== "")
      .map((ing) => {
        console.log(ing);
        const ingArray = ing[1].replaceAll(" ", "").split(",");
        if (ingArray.length !== 3)
          throw new Error(
            "Wrong ingredient format! Please use the correct format :)"
          );
        const [quantity, unit, description] = ingArray;
        return { quantity: quantity ? +quantity : null, unit, description };
      });

    const recipe = {
      title: newRecipes.title,
      source_url: newRecipes.sourceURL,
      image_url: newRecipes.imageURL,
      publisher: newRecipes.publisher,
      cooking_time: newRecipes.cookingTime,
      servings: newRecipes.servings,
      ingredients,
    };

    console.log(recipe);
    const data = await AJAX(`${API_URL}?key=${KEY}`, recipe, "POST");
    console.log(data);
    state.recipe = createRecipeObject(data);

    if (!state.bookmarks.some((item) => item.id === recipe.id)) {
      addBookmark(state.recipe);
    }

    recipeView.render(state.recipe);
    addRecipeView.renderMessage();
    bookmarkView.render(state.bookmarks);

    window.history.pushState(null, `${state.recipe.id}`);
    window.history.back();
  } catch (err) {
    addRecipeView.renderError(err.message);
    throw err;
  }
};
