class View {
  _data;

  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    let dom = this._generateDOM();
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", dom);
  }

  _clear() {
    this._parentElement.innerHTML = "";
  }

  renderSpinner() {
    return `
        <div class="d-flex justify-content-center">
            <div class="spinner-border text-warning" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
    `;
  }

  renderError(message = this._errorMessage) {
    let dom = `
        <div class="message mt-2 mb-5 alert alert-warning d-flex flex-column justify-content-center align-items-center" role="alert">
          <i class="mb-2 fas fa-exclamation-triangle"></i>
          <p class="alert-link">${message}</p>
        </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", dom);
  }

  renderMessage(message = this._message) {
    let dom = `
        <div class="message mt-5 alert alert-light d-flex flex-column justify-content-center align-items-center" role="alert">
          <i class="far fa-smile"></i> 
          <p class="alert-link">${message}</p>
        </div>
      `;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", dom);
  }
}

export default View;
