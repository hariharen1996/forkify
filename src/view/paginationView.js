import View from "./view";

class PaginationView extends View{
    _parentElement = document.querySelector(".pagination");

    addPaginationHandler(handler){
        this._parentElement.addEventListener('click', (e) => {
            let btn = e.target.closest('.btn-page')

            if(!btn) return 

            console.log(btn)
            
            let pages = +btn.dataset.page 
            console.log(pages)
            handler(pages)
        })
    }

    _generateDOM(){
        let currentPage = this._data.page
        const numOfPages = Math.ceil(this._data.results.length / this._data.resultsPerPage)
        console.log(numOfPages)
      
        if(currentPage === 1 && numOfPages > 1){
            return `
            <div class="next-btn">
                <button data-page="${currentPage + 1}" class="btn btn-info text-white btn-page">Page ${currentPage + 1} <i class="fas fa-step-forward"></i></button>
            </div> `
        }

        if(currentPage === numOfPages && numOfPages > 1){
            return ` 
            <div class="prev-btn">
                <button data-page="${currentPage - 1}" class="btn btn-info text-white btn-page">Page ${currentPage - 1} <i class="fas fa-step-backward"></i></button>
            </div>`
        }

        if(currentPage < numOfPages){
            return ` 
            <div class="prev-btn">
                <button data-page="${currentPage - 1}" class="btn btn-info text-white btn-page">Page ${currentPage - 1} <i class="fas fa-step-backward"></i></button>
            </div>
            <div class="next-btn">
                <button data-page="${currentPage + 1}" class="btn btn-info text-white btn-page">Page ${currentPage + 1} <i class="fas fa-step-forward"></i></button>
            </div> 
            
            `
        }

        return ''
    }
 
}

export default new PaginationView()