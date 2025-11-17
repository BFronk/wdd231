const hamBtn = document.querySelector('#ham-btn');
const navBar = document.querySelector('#nav-bar');

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
GetData('data/member.json')
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

//Footer

const currentYear = new Date().getFullYear();
const lastModified = new Date(document.lastModified).toLocaleString();

const footerP = document.createElement('p');
footerP.innerHTML = `
    &copy; ${currentYear} | Bridger Fronk <br>
    Last Modified: ${lastModified}
`;
footer.appendChild(footerP);