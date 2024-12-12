import View from "./view.js";

class ResultsView extends View {
  _parentElement = document.querySelector(".search-recipe");
  _errorMessage = "No recipes found for your query! Please try again :)";
  _message = "";

  addHandlerActive(){
     this._parentElement.addEventListener('click', (e) => {
         let liEl = e.target.closest('li')
         if(!liEl) return 
         console.log(liEl)
  
         let listItemGroup = document.querySelectorAll('.list-group-item')
         listItemGroup.forEach(item => item.classList.remove('active'))

         liEl.classList.add('active')
     })
  }

  _generateDOM() {
    //console.log(this._data)
    return this._data.map(this._generateDOMPreview).join("");
  }

  _generateDOMPreview(data) {
    return `<li class="mb-3 list-group-item d-flex align-items-center">
              <a href="#${data.id}" class="d-flex w-100 align-items-center text-decoration-none">
                <!-- Image Section on the Left -->
                <div class="image-container me-3">
                  <img src="${data.imageURL}" class="rounded-circle" alt="${data.title}">
                </div>

                <!-- Text Section on the Right -->
                <div class="d-flex flex-column">
                  <h5 class="mb-1 text-black">${data.title} <span class="user ${data.key ? "" : "d-none"}"><i class="fas fa-user m-1"></i></span></h5>
                  <p class="mb-0 text-black">${data.publisher}</p>
                </div> 
              </a>
            </li>`;
  }
}

export default new ResultsView();
