
import Search from "./models/Search"

// ==GLOBAL STATE OF THE APP==
const state ={};

const controleSearch = async() =>{
    const query = "sex";
    if (query) {
        state.search = new Search(query);

        await state.search.getResults();

        console.log(state.search.books);
    }
}

document.querySelector('.search-form').addEventListener('submit', e=>{
    e.preventDefault();
    controleSearch();
}
    )





