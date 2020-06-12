import {elements} from './base'

export const getInput = () =>elements.searchInput.value;


export const highlightSelected = id =>{
    const resultArr = Array.from(document.querySelectorAll('.result-link'));
    resultArr.forEach(el => {
        el.classList.remove('result-link-active');
    });
    document.querySelector(`a[href = "#${id}"]`).classList.add("result-link-active");
}

const limitDate = date =>{
    const newDate = date.split('-')[0];
    return newDate;
}

export const limitTitle = (title, limit) => {
    const newTitle = [];
    if (title.length >limit) {
        title.split(' ').reduce((acc,cur) => {
            if((cur.length +acc)<limit) {
                 newTitle.push(cur);
            } return acc+cur.length
        },0);
     return `${newTitle.join(' ')}...`
    }return title;
}


const renderBook = book => {
    const bookAuthor = book.volumeInfo.authors === undefined ? "No author" : book.volumeInfo.authors[0];

    const bookImage = book.volumeInfo.imageLinks === undefined ? "./images/noImage.jpg" : book.volumeInfo.imageLinks.smallThumbnail;

    const bookPublished = book.volumeInfo.publishedDate === undefined ? "" : "Published:"+limitDate(book.volumeInfo.publishedDate);
    const bookLanguage = book.volumeInfo.language === "en" ? "English" : book.volumeInfo.language;
    const markUp = `<li>
    <a class = "result-link" href="#${book.id}">
    <figure class = "result-figure">
        <img src="${bookImage}" alt="image">
    </figure>
    <div class = "short-info">
        <h3 class = "short-title">"${limitTitle(book.volumeInfo.title,14)}"</h3>
        <h3 class = "short-author">${limitTitle(bookAuthor)}</h3>
        <h3 class = "short-release">${bookPublished}</h3>
        <h3 class = "short-language">Language:${bookLanguage}</h3>
    </div>
    </a>
    </li>`;
    elements.serchResultList.insertAdjacentHTML("afterbegin",markUp);

};

const displayCounter = (pages) =>
  `<span class = "pages-amount">Pages:${pages}</span>`;

const createButton = (page, type) => 
    `<button class = "btn-pages result-btn-${type}" data-goto=${type =='next' ? page + 1 : page -1}>    
    <img class = "page-icon" src = "../images/arrow-circle-${type ==='prev'?'left':'right'}-solid.svg"></img>
    <span class = "page-number">Page ${type =='prev' ? page - 1 : page + 1}</span>
    </button>`;
       

const renderButtons = (page, numBooks, booksPerPage) => {
    const pages = Math.ceil(numBooks/booksPerPage);
    console.log(`Amount of pages is ${pages}`)
    let button, counter;
    if (page === 1 && pages>1) {
    // Button to go to the next page
    button = createButton(page, "next");
    counter = displayCounter(pages);
    } else if (page < pages) {
    // Both pages
    counter = displayCounter(pages);
    button = `
    ${createButton(page, "prev")}
    ${createButton(page, "next")}
     `    
    }
     else if (page === pages && pages>1){
    // Button to go to the previous page
    button = createButton(page, "prev");
    counter = displayCounter(pages);
    }
    elements.searchResPages.insertAdjacentHTML("beforeend", button);
    elements.searchResPages.insertAdjacentHTML("beforeend", counter);
};

export const renderBooks = (books, page = 1, booksPerPage = 4) => {
    // Render results of current pages
    const start = (page-1)*booksPerPage;
    
    const end = page*booksPerPage;
    console.log(`Current page is ${page}`)
    books.slice(start,end).forEach(renderBook);
    // Render pagination buttons
    renderButtons(page,books.length,booksPerPage);

};

export const clear =() => {
    elements.searchInput.value = '';
};
export const clearList = () => {
    elements.serchResultList.innerHTML = '';
}
export const clearButton = () => {
    elements.searchResPages.innerHTML = '';
}
