import { elements } from './base';
import { limitTitle } from './SearchView';

export const toggleLikeBtn = isLiked =>{
    const iconString = isLiked ? 'liked' : 'like';
    document.querySelector('.btn-like img').setAttribute('src', `./images/${iconString}.svg`);
}

export const toggleLikeMenu = numLikes =>{
    elements.likesMenue.style.visibility = numLikes > 0 ? 'visible' : 'hidden';
}

export const renderLike = like =>{
    const markUp = `
    <li>
    <a class = "likes-link" href="#${like.id}">
        <figure class = "like-figure">
            <img src="${like.img}" alt="image">
        </figure>
        <div class = "like-info">
            <h3 class = "like-title">${limitTitle(like.title,11)}</h3>
            <h3 class = "like-author">${like.author}</h3>
        </div>
    </a>
</li>   `


    elements.likesList.insertAdjacentHTML("beforeend",markUp);
};

export const deleteLike = id => {
    const el = document.querySelector(`.likes-link[href*="${id}"]`).parentElement;
    if(el) el.parentElement.removeChild(el);
};