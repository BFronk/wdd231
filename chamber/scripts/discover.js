// scripts/discover.js — completely standalone, no base.js needed

import { attractions } from '../data/vero-beach.mjs';

// === Build the attraction cards ===
const grid = document.getElementById('discover-grid');

attractions.forEach((place, index) => {
    const card = document.createElement('article');
    card.className = 'discover-card';
    card.style.gridArea = `card${index + 1}`;

    card.innerHTML = `
        <h2>${place.name}</h2>
        <figure>
            <img src="${place.image}" alt="${place.alt}" loading="lazy" width="300" height="200">
        </figure>
        <address>${place.address}</address>
        <p>${place.description}</p>
        <button class="learn-more">Learn More</button>
    `;

    grid.appendChild(card);
});

// === Visit message (localStorage) ===
const visitMessage = document.getElementById('visit-message');
const msInDay = 1000 * 60 * 60 * 24;
const now = Date.now();
const lastVisit = localStorage.getItem('chamberDiscoverVisit');

if (!lastVisit) {
    visitMessage.textContent = "Welcome! Let us know if you have any questions.";
} else {
    const daysAgo = Math.floor((now - Number(lastVisit)) / msInDay);
    if (daysAgo < 1) {
        visitMessage.textContent = "Back so soon! Awesome!";
    } else if (daysAgo === 1) {
        visitMessage.textContent = "You last visited 1 day ago.";
    } else {
        visitMessage.textContent = `You last visited ${daysAgo} days ago.`;
    }
}
localStorage.setItem('chamberDiscoverVisit', now);

const footer = document.querySelector('footer');
const currentYear = new Date().getFullYear();
const lastModified = new Date(document.lastModified).toLocaleString();

const footerP = document.createElement('p');
footerP.innerHTML = `
    &copy; ${currentYear} | Bridger Fronk <br>
    Last Modified: ${lastModified}
`;
footer.appendChild(footerP);