const hamBtn = document.querySelector('#ham-btn');
const navBar = document.querySelector('#nav-bar');
const footer = document.querySelector('footer');


hamBtn.addEventListener('click', () => {
    hamBtn.classList.toggle('show');
    navBar.classList.toggle('show');
});

async function GetData(file) {
    const response = await fetch(file);
    if (!response.ok) throw new Error("Network error");
    const data = await response.json();
    console.log(data);
    return data;
}

//  Load data and render
GetData('data/members.json')
    .then(data => {
        generatePeopleFigures(data.members);
    })
    .catch(err => {
        console.error("Failed to load members:", err);
    });



function generatePeopleFigures(personData) {
    const mainGrid = document.querySelector('#people-list');
    mainGrid.innerHTML = ''; // Clear existing content

    personData.forEach(person => {
        const card = document.createElement('div');
        card.className = "card";  

        const img = document.createElement('img');
        img.className = 'member-image';
        img.setAttribute("src", person.image);
        img.setAttribute("alt", `${person.name} Photo`);
        img.setAttribute("loading", "lazy");
        console.log(img)
        
        const name = document.createElement('h1');
        name.className = "card-name";
        name.innerHTML = `<strong>${person.name}</strong><br>`;  

        const buisness = document.createElement('h3');
        buisness.className = "card-buisness";
        buisness.innerHTML = `<strong>Buisness: ${person.buisness}</strong><br>`;

        const address = document.createElement('p');
        address.className = "card-address";
        address.innerHTML = `<strong>Address: ${person.address}</strong><br>`;

        const phone = document.createElement('p');
        phone.className = "card-phone";
        phone.innerHTML = `<strong>Phone: ${person.phone}</strong><br>`;

        const email = document.createElement('p');
        email.className = "card-email";
        email.innerHTML = `<strong>Email: ${person.email}</strong><br>`;

        const url = document.createElement('p');
        url.className = "card-url";
        url.innerHTML = `<strong><a href="${person.url}">Website: ${person.url}</a></strong><br>`;

        const membership = document.createElement('h2');
        membership.className = "card-membership";
        if (person.membership == 1) {
            membership.innerHTML = `<strong>Bronze</strong>`;
            membership.style.color = '#CD7F32'
        }
        else if (person.membership == 2) {
            membership.innerHTML = `<strong>Silver</strong>`;
            membership.style.color = '#C0C0C0'

        }
        else if (person.membership == 3) {
            membership.innerHTML = `<strong>Gold</strong>`;
            membership.style.color = '#FFD700'

        }
        else {
            membership.innerHTML = `No membership`
        }

        card.append(img, name, buisness, address, phone, email, url, membership);
        mainGrid.appendChild(card);
    });
}


function generateSpotlights(personData) {
    const spotlights = document.querySelector('#spotlight-list')
    spotlights.innerHTML = ''; // Clear existing content
        const eligibleMembers = members.filter(member => 
        person.membership === 'gold' ||
        person.membership === 'silver'
    );
    
    }
    
//Footer

const currentYear = new Date().getFullYear();
const lastModified = new Date(document.lastModified).toLocaleString();

const footerP = document.createElement('p');
footerP.innerHTML = `
    &copy; ${currentYear} | Bridger Fronk <br>
    Last Modified: ${lastModified}
`;
footer.appendChild(footerP);

// =========INDEX==============
// SELECT HTML ELEMENTS IN THE DOCUMENT
const myTown = document. querySelector('#town');
const myDecription = document. querySelector('#description');
const myTemperature = document. querySelector('#temperature');
const myGraphic = document. querySelector('#graphic');
// CREATE REQUIED VARIABLES FOR THE URL
const myKey = "5d80e10b09ffb64959eb48570364746d"
const myLat = "27.63"
const myLon = "-80.39"
//CONSTRUCT A FULL PATH USING TEMPLATE LITERALS
const myURL = `//api.openweathermap.org/data/2.5/weather?lat=${myLat}&lon=${myLon}&appid=${myKey}&units=imperial`
const myForecastURL = `//api.openweathermap.org/data/2.5/forecast?lat=${myLat}&lon=${myLon}&appid=${myKey}&units=imperial`
// TRY TO GRAB THE CURRENT WEATHER DATA
async function apiFetch() {
try {
const response = await fetch (myURL);
if (response.ok) {
const data = await response.json();
console.log(data); // testing only
displayResults(data); // uncomment when ready
} else {
throw Error(await response. text ());
}
} catch (error) {
console. log(error);
}
}
async function forcecastApiFetch() {
try {
const response = await fetch (myForecastURL);
if (response.ok) {
const data = await response.json();
console.log(data); // testing only
displayForecastResults(data); // uncomment when ready
console.log("chicken")
} else {
throw Error(await response. text ());
}
} catch (error) {
console.log(error);
}
}
function displayResults(data) {
    console.log('hello world');
    myTown.innerHTML = data.name
    myDecription.innerHTML = data.weather[0].description
    myTemperature.innerHTML = `${data.main.temp}&degF`
}
function displayForecastResults(data) {

}
// START THE PROCESS
apiFetch()
forcecastApiFetch()

//====== JOIN =======

// const bronzeButton = document.querySelector('#learn-bronze')
// const bronzeModal = document.querySelector('#bronze-modal')
// const closebtn = document.querySelector('.close-btn')

// bronzeButton.addEventListener("click", () => {
//   bronzeModal.showModal();
// });

// closebtn.addEventListener("click", () => {
//     closebtn.close();
// })


//====== Discover Vero Beach =======
// import { attractions } from 'vero-beach.mjs';

// const grid = document.getElementById('discover-grid');
// const visitMessage = document.getElementById('visit-message');

// // Build the cards
// attractions.forEach((place, index) => {
//     const card = document.createElement('article');
//     card.className = 'discover-card';
//     card.style.gridArea = `card${index + 1}`;

//     card.innerHTML = `
//         <h2>${place.name}</h2>
//         <figure>
//             <img src="${place.image}" alt="${place.alt}" loading="lazy" width="300" height="200">
//         </figure>
//         <address>${place.address}</address>
//         <p>${place.description}</p>
//         <button class="learn-more">Learn More</button>
//     `;

//     grid.appendChild(card);
// });

// // Visit message logic
// const msToDays = 84600000; // milliseconds in a day
// const lastVisit = localStorage.getItem('lastVisit');
// const now = Date.now();

// if (!lastVisit) {
//     visitMessage.textContent = "Welcome! Let us know if you have any questions.";
// } else {
//     const daysBetween = Math.floor((now - parseInt(lastVisit)) / msToDays);

//     if (daysBetween < 1) {
//         visitMessage.textContent = "Back so soon! Awesome!";
//     } else if (daysBetween === 1) {
//         visitMessage.textContent = "You last visited 1 day ago.";
//     } else {
//         visitMessage.textContent = `You last visited ${daysBetween} days ago.`;
//     }
// }
// localStorage.setItem('lastVisit', now);

