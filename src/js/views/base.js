export const elements = {
    searchInput:document.querySelector('#search-field'),
    submitForm:document.querySelector('.search-form'),
    searchResult:document.querySelector('.list-books'),
    serchResultList: document.querySelector(".result-list"),
    searchResPages: document.querySelector(".books-pages"),
    bookDisplayPage: document.querySelector(".info-book"),
    likeButton:document.querySelector(".btn-like"),
    searchButton:document.getElementById("btn-submit"),
    likesMenue:document.querySelector(".likes-logo"),
    likesList:document.querySelector(".likes-list"),
    };

export const elementStrings = {
    loader: "loader"
}

export const renderLoader = parent => {
    const loader = `
        <div class = "${elementStrings.loader}">
            <img src = "images/249.gif" alt = "loading.." />    
        </div>
    `;
    parent.insertAdjacentHTML("afterbegin", loader);
    };

export const clearLoader = () => {
    const loader = document.querySelector(`.${elementStrings.loader}`);
    if (loader) loader.parentElement.removeChild(loader);
}