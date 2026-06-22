import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { getImages } from './js/pixabay-api';
import { createGalleryMarkup } from './js/render-functions.js';

const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.load-more');

let page = 1;
let currentQuery = '';
let totalHits = 0;
const perPage = 40;

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

form.addEventListener('submit', async event => {
  event.preventDefault();

  currentQuery = event.currentTarget.elements.search.value.trim();

  if (!currentQuery) return;

  page = 1;
  gallery.innerHTML = '';

  loadMoreBtn.classList.add('hidden');

  await loadImages();
});

loadMoreBtn.addEventListener('click', async () => {
  page += 1;

  await loadImages();

  smoothScroll();
});

async function loadImages() {
  try {
    loader.classList.remove('hidden');

    const data = await getImages(currentQuery, page);

    totalHits = data.totalHits;

    if (data.hits.length === 0) {
      iziToast.error({
        message: 'Sorry, there are no images matching your search query.',
        position: 'topRight',
      });

      return;
    }

    gallery.insertAdjacentHTML('beforeend', createGalleryMarkup(data.hits));

    lightbox.refresh();

    checkEndOfResults();
  } catch (error) {
    iziToast.error({
      message: 'Something went wrong. Please try again.',
      position: 'topRight',
    });

    console.error(error);
  } finally {
    loader.classList.add('hidden');
  }
}

function checkEndOfResults() {
  const loadedImages = page * perPage;

  if (loadedImages >= totalHits) {
    loadMoreBtn.classList.add('hidden');

    iziToast.info({
      message: "We're sorry, but you've reached the end of search results.",
      position: 'topRight',
    });

    return;
  }

  loadMoreBtn.classList.remove('hidden');
}

function smoothScroll() {
  const card = document.querySelector('.gallery-item');

  if (!card) return;

  const { height } = card.getBoundingClientRect();

  window.scrollBy({
    top: height * 2,
    behavior: 'smooth',
  });
}
