
import Search from "./models/Search";
import * as searchView from "./views/SearchView";
import * as bookView from "./views/BookView";
import * as likesView from "./views/LikesView";
import { elements,renderLoader,clearLoader } from "./views/base";
import Book from "./models/Book";
import Likes from "./models/Like";

const state ={};
// ==GLOBAL STATE OF THE APP==
// *
//  **SEARCH CONTROLLER**
// *

const controlSearch = async() =>{
// 1. GET query from serch view    
    const query = searchView.getInput();
    // elements.bookDisplayPage.classList.remove("show");
    // console.log(query);
    if (query) {
// 2. New search object and add it to state
        state.search = new Search(query);
// Prepare UI for the results
        searchView.clear();
        searchView.clearList();
        searchView.clearButton();
        renderLoader(elements.searchResult);
// 3. Search for books
        try{
            await state.search.getResults();
            console.log(state.search.books);
    // 4. Render books to UI
            clearLoader();
            searchView.renderBooks(
                state.search.books,
                );
        }
        catch(e) {
            alert("Something went wrong!");
        }
    }
}

// SETUP event listeners for user's input 
    
    elements.searchButton.addEventListener("click",e =>{
        e.preventDefault();
        controlSearch();
    }
    );
    document.addEventListener('keypress', function(event){
        if(event.keyCode ===13) {
          controlSearch();
        }
      });

elements.searchResPages.addEventListener("click", e => {
    const btn = e.target.closest(".btn-pages");
    if(btn) {
        const goToPage = parseInt(btn.dataset.goto);
        console.log(goToPage);
        searchView.clearList();
        searchView.clearButton();
        searchView.renderBooks(state.search.books,goToPage);
        window.scroll(0,0);
    }
})

const controlBook = async() => {
    // Get id from URL
    const id = window.location.hash.replace("#","");
    
    if(id){
        // Prepare UI for changes
        elements.bookDisplayPage.classList.add("show");
        bookView.clearBook();
        renderLoader(elements.bookDisplayPage);

        // Hightlight selected search item
        searchView.highlightSelected(id);
        // Create new book object
        state.book = new Book(id);
        try{
        // Render recipe
            await state.book.getBook()           
            console.log(state.book);
            clearLoader();
            bookView.displayBook(
                state.book.displayedBook,
                state.likes.isLiked(id));
                
            // const isLikedAlready = (state.likes) ? state.likes.isLiked(id) : false;
            // bookView.displayBook(state.book.displayedBook);
            

        }
        catch(e){
            alert("Error processing book")
        }
        // Get book data
    }
};


// ["hashchange", "load"].forEach(event => window.addEventListener(event,controlBook));
window.addEventListener("hashchange",controlBook);

// ==LIKES Controller==

state.likes = new Likes();
likesView.toggleLikeMenu(state.likes.getNumLikes());
// likesView.toggleLikeMenu(state.likes.getNumLikes());
const controlLike =() => {
    if (!state.likes) state.likes = new Likes();
//     // User has NOT yet liked the Book
    if (!state.likes.isLiked(state.book.id)){
//     // Add like to the state
    const newLike = state.likes.addLike(
//         // currentID,
        state.book.id,
        state.book.displayedBook.title,
        state.book.displayedBook.author,        
        state.book.displayedBook.image);
        
        
//         // Toggle the like button
        likesView.toggleLikeBtn(true);
//         //  Add like to UI list 
        likesView.renderLike(newLike);
        console.log(state.likes);
//     // User has already liked the book 
    } else {
    
//     // Remove likes button from the state
        state.likes.deleteLike(state.book.id);
        

//     // Toggle the like button
        likesView.toggleLikeBtn(false);
           
//     // Remove like from UI list
        likesView.deleteLike(state.book.id)
    console.log(state.likes);
    }  
    likesView.toggleLikeMenu(state.likes.getNumLikes());
};

elements.bookDisplayPage.addEventListener('click', e => {
    if (e.target.matches('.btn-like, .btn-like *')){
        controlLike();
    }
})