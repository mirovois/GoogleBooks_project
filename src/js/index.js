
import Search from "./models/Search";
import * as searchView from "./views/SearchView";
import { elements,renderLoader,clearLoader } from "./views/base";

// ==GLOBAL STATE OF THE APP==
const state ={};

const controlSearch = async() =>{
// 1. GET query from serch view    
    const query = searchView.getInput();
    console.log(query);
    if (query) {
// 2. New search object and add it to state
        state.search = new Search(query);
// Prepare UI for the results
        searchView.clear();
        searchView.clearList();
        renderLoader(elements.searchResult);
// 3. Search for books
        await state.search.getResults();
        console.log(state.search.books);
// 4. Render books to UI
        clearLoader();
        searchView.rendreBooks(state.search.books);
    }
}

elements.submitForm.addEventListener('submit', e=>{
    e.preventDefault();
    controlSearch();
}
    )





