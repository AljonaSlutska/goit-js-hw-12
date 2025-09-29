import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const list = document.querySelector(".gallery");
const loader = document.querySelector(".loader");
const loadMoreBtn = document.querySelector(".load-more");

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export function createGallery(images) {
  const markup = images.map(image => `
        <li class="gallery-item">
        <a href="${image.largeImageURL}">
        <img src="${image.webformatURL}" alt="${image.tags}"/>
        </a>
        <div class="info">
        <p><b>Likes:</b> ${image.likes}</p>
        <p><b>Views:</b> ${image.views}</p>
        <p><b>Comments:</b> ${image.comments}</p>
        <p><b>Downloads:</b> ${image.downloads}</p>
        </div>
        </li>`)

    .join('');

  list.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

export function clearGallery() {
  list.innerHTML = "";
}

export function showLoader() {
  loader.classList.remove("is-hidden");
}

export function hideLoader() {
  loader.classList.add("is-hidden");
}

export function showLoadMoreButton() {
  loadMoreBtn.classList.remove("is-hidden");
}

export function hideLoadMoreButton() {
  loadMoreBtn.classList.add("is-hidden");
}