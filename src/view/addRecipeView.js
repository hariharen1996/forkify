import View from "./view"

class AddRecipeView extends View{
    _parentElement = document.querySelector('.modal .recipe-form')
    _message = 'Recipe is successfully added! :)'
    
    constructor(){
        super()
    }

    addHandlerUpload(handler){
        this._parentElement.addEventListener('submit',function(e) {
            e.preventDefault()
            console.log(this._parentElement)
            const dataAttr = [...new FormData(this)]
            const data = Object.fromEntries(dataAttr)
            //console.log(data)
            handler(data)
        })
    }

    _generateDOM(){

    }
}

export default new AddRecipeView()