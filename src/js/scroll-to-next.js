import ImageApiService from './apiService';
import { galleryRef } from './refs';


export default function scrollToNext() {
  if (galleryRef.children.length > ImageApiService.perPage) {
    const { scrollTop, clientHeight } = document.documentElement;

    window.scrollTo({
      top: scrollTop + clientHeight,
    });
  }
}