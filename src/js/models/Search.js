import axios from "axios";
import {key,proxy} from '../config';

// ==Create search Object
export default class Search{
    constructor(query){
    this.query = query;
    }
    
    async getResults(){
    
    try {
        const res = await axios(`https://www.googleapis.com/books/v1/volumes/?q=${this.query}&maxResults=40`);
//  the result is held here
        this.books = res.data.items;
        
    }
    catch(error){
        alert("There was a problem with fetching a query");
    }
}
}