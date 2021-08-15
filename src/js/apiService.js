
const BASE_URL = 'https://pixabay.com/api';
const KEY = '22920296-83f622dc6fe28ab18a69af7db';

export default class ImagesApiService {
  constructor() {
    this.searchQuery = '';
      this.page = 1;
      this.per_page = 12;
  }

    async fetchImages() {
    const responseUrl = await fetch(
      `${BASE_URL}/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${KEY}`,
    );

    const { hits: images } = await responseUrl.json();
    this.incrementPage();

    return images;
  }
  

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}