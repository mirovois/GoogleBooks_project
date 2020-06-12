import axios from "axios";
import {key,proxy} from '../config';
export default class Book {
    constructor(id){
        this.id = id;
    }

async getBook(){
    try{
        const res = await axios(`https://www.googleapis.com/books/v1/volumes/${this.id}`);
        this.displayedBook = {
            title: res.data.volumeInfo.title,
            author: res.data.volumeInfo.authors,
            image: res.data.volumeInfo.imageLinks.thumbnail,
            description: res.data.volumeInfo.description,
            language:res.data.volumeInfo.language,
            numOfPages:res.data.volumeInfo.pageCount
        }
        
    } catch(error){
        console.log(error);
        alert("Something went wrong")
    }
}
}