"use strict";
// import axios from 'axios';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
document.getElementById('searchButton').addEventListener('click', () => {
    const query = document.getElementById('searchInput').value;
    searchImages(query);
});
const imageGallery = document.getElementById('imageGallery');
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            observer.unobserve(img);
        }
    });
}, {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
});
function searchImages() {
    return __awaiter(this, arguments, void 0, function* (query = '') {
        try {
            const response = yield axios.get(`https://api.unsplash.com/search/photos?query=${query}&client_id=upbc8Esy7mP3seS1ZxmOyUpP3mtxP55CyJYBHr8iqyk`);
            imageGallery.innerHTML = '';
            response.data.results.forEach((photo) => {
                const img = document.createElement('img');
                img.dataset.src = photo.urls.small;
                img.alt = photo.alt_description;
                img.classList.add('lazy');
                imageGallery.appendChild(img);
                observer.observe(img);
            });
        }
        catch (error) {
            console.error('Error fetching images:', error);
        }
    });
}
// Attach the function to the global window object
window.searchImages = searchImages;
// Optionally load random images or popular tags on initial load
searchImages('popular');
