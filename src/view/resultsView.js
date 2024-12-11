import View from "./view.js";

class ResultsView extends View {
  _parentElement = document.querySelector(".search-recipe");
  _errorMessage = "No recipes found for your query! Please try again :)";
  _message = "";

  _generateDOM() {
    //console.log(this._data)
    return this._data.map(this._generateDOMPreview).join("");
  }

  _generateDOMPreview(data) {
    return `<li class="mb-3 list-group-item d-flex align-items-center">
              <a href="#${data.id}" class="d-flex w-100 align-items-center">
                <!-- Image Section on the Left -->
                <div class="image-container me-3">
                  <img src="${data.imageURL}" class="rounded-circle" alt="${data.title}">
                </div>

                <!-- Text Section on the Right -->
                <div class="d-flex flex-column">
                  <h5 class="mb-1">${data.title}</h5>
                  <p class="mb-0">${data.publisher}</p>
                </div>
              </a>
            </li>`;
  }
}

export default new ResultsView();
