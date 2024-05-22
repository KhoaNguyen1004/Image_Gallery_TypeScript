// import axios from 'axios';
// Import axios
declare var axios: any;

document.getElementById('searchButton')!.addEventListener('click', () => {
    const query = (document.getElementById('searchInput') as HTMLInputElement).value;
    searchImages(query);
});

const imageGallery = document.getElementById('imageGallery')!;
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            img.src = img.dataset.src!;
            observer.unobserve(img);
        }
    });
}, {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
});

async function searchImages(query = '') {
    try {
        const response = await axios.get(`https://api.unsplash.com/search/photos?query=${query}&client_id=upbc8Esy7mP3seS1ZxmOyUpP3mtxP55CyJYBHr8iqyk`);
        imageGallery.innerHTML = '';
        response.data.results.forEach((photo: { urls: { small: string; }; alt_description: string; }) => {
            const img = document.createElement('img');
            img.dataset.src = photo.urls.small;
            img.alt = photo.alt_description;
            img.classList.add('lazy');
            imageGallery.appendChild(img);
            observer.observe(img);
        });
    } catch (error) {
        console.error('Error fetching images:', error);
    }
}

// Attach the function to the global window object
(window as any).searchImages = searchImages;

// Optionally load random images or popular tags on initial load
searchImages('popular');
