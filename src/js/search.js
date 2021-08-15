import { formRef, galleryRef } from './refs';
import ImagesApiService from './apiService';
import { error } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
import LoadMoreBtn from './load-more-btn';
import cardsTpl from '../components/cards.hbs';
import { onGalleryElClick } from './modal';



const loadMoreBtn = new LoadMoreBtn('#load-btn');

loadMoreBtn.refs.button.addEventListener('click', onLoadMore);
  

const imageApiService = new ImagesApiService();

formRef.addEventListener('submit', onSearch);
galleryRef.addEventListener('click', onGalleryElClick);



function onSearch(e) {
    e.preventDefault();
    imageApiService.query = e.currentTarget.elements.query.value;
    if (imageApiService.query === '') {
        return error({
            type: 'info',
            text: 'Type the request 🔎',
            delay: 2000,
            width: '300px',
            maxTextHeight: null,
        });
    }
    loadMoreBtn.show();
    imageApiService.resetPage();
    clearContainer();
    fetchCards();
}

 function fetchCards() {
    loadMoreBtn.disabled();
    imageApiService.fetchImages().then(images => {
      appendImageMarkup(images);
      loadMoreBtn.enable();
      scrollPage();
      loadMoreBtn.enable();
      if (cards.length === 0) {
      loadMoreBtn.hide();
      
    }
    });
     
}

function appendImageMarkup(hits) {
    galleryRef.insertAdjacentHTML('beforeend', cardsTpl(hits));
}
function clearContainer() {
    galleryRef.innerHTML = '';
}

function onLoadMore() {
  fetchCards();
}




function scrollPage() {
  try {
    setTimeout(() => {
      window.scrollTo({
        top: document.body.scrollHeight,
        left: 0,
        behavior: 'smooth',
      });
    }, 750);
  } catch (error) {
    console.log(error);
  }
}