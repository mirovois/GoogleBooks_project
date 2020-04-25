import axios from "axios";

// ==Create search Object
export default class Search{
    constructor(query){
    this.query = query;
    }
    
    async getResults(){
    const key = "AIzaSyAC3SreNBu3SzBFIdLHyLED4XX2Y9Bsng4";
    const proxy = "https://cors-anywhere.herokuapp.com/";
    try {
        const res = await axios(`${proxy}https://www.googleapis.com/books/v1/volumes/?q=${this.query}`);
//  the result is held here
        this.books = res.data.items;
        
    }
    catch(error){
        alert(error);
    }
}
}