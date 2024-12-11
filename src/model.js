import { API_URL } from "./config";
import { getJSON } from "./helpers";

export const state = {
  recipe: {},
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
