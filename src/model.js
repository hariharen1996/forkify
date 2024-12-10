
export const state = {
    recipe: {}
}


export const loadRecipes = async (id) => {
   try{
    const response = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${id}`)
    const data = await response.json()

    if(!response.ok) throw new Error(`${data.message} ${response.status}`)

    //console.log(data)
    let { recipe } = data.data
    state.recipe = {
        id: recipe.id,
        imageURL: recipe.image_url,
        cookingTime: recipe.cooking_time,
        sourceURL: recipe.source_url,
        servings: recipe.servings,
        title: recipe.title,
        publisher: recipe.publisher,
        ingredients: recipe.ingredients
    }

    //console.log(recipe)

}catch(err){
    console.log(err)
}
}