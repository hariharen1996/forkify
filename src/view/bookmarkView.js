import View from "./view.js";

class BookmarksView extends View {
  _parentElement = document.querySelector(".recipe-bookmarks");
  _errorMessage = "No bookmarks yet. Find a new recipe and bookmark it. :)";
  _message = "";

  _generateDOM() {
    //console.log(this._data)
    return this._data.map(this._generateDOMPreview).join("");
  }

  addHandlerRender(hander){
    window.addEventListener('load',hander)
  }

  _generateDOMPreview(data) {
    return `<li class="mb-3 list-group-item d-flex align-items-center">
              <a href="#${data.id}" class="d-flex w-100 align-items-center text-decoration-none">
                <!-- Image Section on the Left -->
                <div class="image-container">
                  <img src="${data.imageURL}" class="rounded-circle" alt="${data.title}">
                </div>

                <!-- Text Section on the Right -->
                <div class="d-flex flex-column">
                 <h5 class="mb-1 text-black">${data.title} <span class="user ${data.key ? "" : "d-none"}"><i class="fas fa-user m-1"></i></span></h5>
                 <p class="mb-0 text-black">${data.publisher}</p>
                </div>
              </a>
            </li>
            <hr/ >`;
  }
}

export default new BookmarksView();
