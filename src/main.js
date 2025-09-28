import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import { getImagesByQuery } from "./js/pixabay-api";
import { createGallery, clearGallery, showLoader, hideLoader, showLoadMoreButton, hidenLoadMoreButton } from "./js/render-functions";

const form = document.querySelector(".form");
const list = document.querySelector(".gallery");
const loadMoreBtn = document.querySelector(".load-more");

let page = 1;
let perPage = 15;
let currentQuery = "";

form.addEventListener("submit", handleSubmit);
loadMoreBtn.addEventListener("click", handleLoadMore);

async function handleSubmit(event) {
    event.preventDefault();
    
    const searchText = event.currentTarget.elements["search-text"].value;
    const query = searchText.trim();

    if (!query) return;

    currentQuery = query;
    page = 1;
    clearGallery();
    hidenLoadMoreButton();
    showLoader();

    try {
        const data = await getImagesByQuery (currentQuery, page, perPage);
        if (data.hits.length === 0) {
            iziToast.info({
                    title: "Info",
                    message: "Sorry, there are no images matching your search query. Please try again!",
                    position: "topRight",
                });
                return;
        }
                    createGallery(data.hits);
                    if (data.totalHits > perPage) {
                        showLoadMoreButton();
                    }
                } catch(error) {
            console.error("Помилка при отриманні зображення:", error);
            iziToast.info({
                title: "Error",
                message: "Something went wrong. Please try again later.",
                position: "topRight",
            });
         } finally {
                    hideLoader();
                };
            };

async function handleLoadMore() {
    page += 1;
    showLoader();
    try {
        const data = await getImagesByQuery(currentQuery, page, perPage);
        createGallery(data.hits);
    const { height: cardHeight } = list.firstElementChild.getBoundingClientRect();

window.scrollBy({
    top: cardHeight * 2,
    behavior: "smooth",
})
        const totalLoaded = page * perPage;
        if (totalLoaded >= data.totalHits) {
            hideLoadMoreButton();
            iziToast.info({
                title: "Info",
                message: "We're sorry, but you've reached the end of search results.",
                position: "topRight",
            });
        }
    } catch (error) {
        console.log("Помилка при завантаженні наступної сторінки:", error);
        iziToast.error({
            title: "Error",
            message: "Could not load more images.",
            position: "topRight",
        });
    } finally {
        hideLoader()
    }
}
