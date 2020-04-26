export const elements = {
    searchInput:document.querySelector('#search-field'),
    submitForm:document.querySelector('.search-form'),
    searchResult:document.querySelector('.list-books'),
    serchResultList: document.querySelector(".result-list")
};

export const elementStrings = {
    loader: "loader"
}

export const renderLoader = parent => {
    const loader = `
        <div class = "${elementStrings.loader}">
            <img src = "images/Reload-2.1s-51px.gif" alt = "loading.." />    
        </div>
    `;
    parent.insertAdjacentHTML("afterbegin", loader);
    };

export const clearLoader = () => {
    const loader = document.querySelector(`.${elementStrings.loader}`);
    if (loader) loader.parentElement.removeChild(loader);
}