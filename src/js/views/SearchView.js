import {elements} from './base'

export const getInput = () =>elements.searchInput.value;

const limitTitle = (title, limit = 15) => {
    const newTitle = [];
    if (title.length >limit) {
        title.split(' ').reduce((acc,cur) => {
            if((cur.length +acc)<15) {
                 newTitle.push(cur);
            } return acc+cur.length
        },0);
     return `${newTitle.join(' ')}...`
    }return title;
}


const rendreBook = book => {
    const markUp = `<li>
    <a class = "results-link" href="#${book.id}">
    <figure >
        <img src="${book.volumeInfo.imageLinks.smallThumbnail}" alt="image">
    </figure>
    <div class = "short-info">
        <h3 class = "short-title">${limitTitle(book.volumeInfo.title,12)}</h3>
        <h3 class = "short-author">"${book.volumeInfo.authors[0]}"</h3>
    </div>
    </a>
    </li>`;
    elements.serchResultList.insertAdjacentHTML("beforeend",markUp);

};

export const rendreBooks = books => {
    books.forEach(rendreBook);
};

export const clear =() => {
    elements.searchInput.value = '';
};
export const clearList = () => {
    elements.serchResultList.innerHTML = '';
}
