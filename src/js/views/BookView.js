import {elements} from "./base";

// export const displayBookWrapper = () => {
//     elements.bookDisplayPage.classList.add("show");
// }

export const displayBook = (book,isLiked) => {
 const bookMarkUp = 
  `
  <div class="info-book-header">
            <div class="book-name">
                <h2 class = "book-title">"${book.title}"</h2>
                <h3 class = "book-author">${book.author}</h3>
            </div>
            <button class = "btn-like">
                <img src="./images/like${isLiked ? "d" : ""}.svg" alt="like-image">
            </button>
        </div>

        <div class = "middle-section">
            
                <img id = "img-main" src="${book.image}" alt="image">
                <p class ="book-description">${book.description}</p>
        </div>
        
        <div class = "book-misl">
                <span class = "language">Language:${book.language}</span>
                <span class = "pages">Pages - ${book.numOfPages}</span>
        </div>                 
 `
 elements.bookDisplayPage.insertAdjacentHTML("afterbegin",bookMarkUp);
}; 
export const clearBook = () => {
    elements.bookDisplayPage.innerHTML = '';
}

