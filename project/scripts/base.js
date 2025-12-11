// Hamburger Menu
const hamBtn = document.getElementById('ham-btn');
const navBar = document.getElementById('nav-bar');

if (hamBtn && navBar) {
    hamBtn.addEventListener('click', () => {
        hamBtn.classList.toggle('show');
        navBar.classList.toggle('show');
    });
}

// Footer Copyright
const footer = document.querySelector('footer');
if (footer) {
    footer.innerHTML = `
        &copy; ${new Date().getFullYear()} Bowling Stat Aggregator | 
        Last modified: ${new Date(document.lastModified).toLocaleDateString()}
    `;
}

// BOWLING STATS 
const welcomeMessage = document.getElementById('welcome-message');
const addGameBtn = document.getElementById('add-game-btn');
const welcomeModal = document.getElementById('add-game-modal');
const closeModal = document.querySelector('.close-modal');
const gameForm = document.getElementById('game-form');

if (welcomeMessage && addGameBtn && welcomeModal) {
    let stats = JSON.parse(localStorage.getItem('bowlingStats')) || {
        games: [],
        high: 0,
        low: 300,
        totalStrikes: 0
    };

// Only run on community page
if (document.getElementById('people-list')) {
    GetData('data/members.json')
        .then(data => {
            if (data && data.members) {
                generatePeopleFigures(data.members);
            }
        })
        .catch(err => {
            console.error("Failed to load:", err);
        });
}

function generatePeopleFigures(personData) {
    const mainGrid = document.querySelector('#people-list');
    if (!mainGrid) return;

    mainGrid.innerHTML = ''; // Clear existing content

    personData.forEach(person => {
        const card = document.createElement('div');
        card.className = "card";

        const name = document.createElement('h3');
        name.className = "card-name";
        name.innerHTML = `<strong>${person.name}</strong>`;

        const phone = document.createElement('p');
        phone.className = "card-phone";
        phone.innerHTML = `Phone: ${person.phone}`;

        const email = document.createElement('p');
        email.className = "card-email";
        email.innerHTML = `Email: <a href="mailto:${person.email}">${person.email}</a>`;

        const stats = document.createElement('div');
        stats.className = "bowling-stats";
        stats.innerHTML = `
            <p><strong>High Game:</strong> ${person.highgame}</p>
            <p><strong>Average:</strong> ${person.average}</p>
            <p><strong>Total Strikes:</strong> ${person.strikes}</p>
        `;

        card.append(name, phone, email, stats);
        mainGrid.appendChild(card);
    });
}
    // Update welcome message
    function updateWelcome() {
        if (stats.games.length === 0) {
            welcomeMessage.textContent = "Welcome! Add your first game to get started!";
            return;
        }

        const totalPins = stats.games.reduce((sum, game) => sum + game.score, 0);
        const average = Math.round(totalPins / stats.games.length);

        welcomeMessage.innerHTML = `
            Your Bowling Stats<br>
            <small style="font-size: 0.9rem; color: #333;">
                High Game: <strong>${stats.high}</strong> | 
                Low Game: <strong>${stats.low}</strong> | 
                Average: <strong>${average}</strong> | 
                Total Strikes: <strong>${stats.totalStrikes}</strong>
            </small>
        `;
    }

    // Save new game
    if (gameForm) {
        gameForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const score = parseInt(document.getElementById('score').value);
            const strikes = parseInt(document.getElementById('strikes').value);

            if (isNaN(score) || isNaN(strikes) || score < 0 || score > 300) {
                alert("Please enter a valid score (0-300) and strikes (0-12)");
                return;
            }

            // Add game
            stats.games.push({
                score,
                strikes,
                date: new Date().toLocaleDateString()
            });

            // Update high/low
            if (stats.games.length === 1) {
                stats.high = score;
                stats.low = score;
            } else {
                if (score > stats.high) stats.high = score;
                if (score < stats.low) stats.low = score;
            }

            stats.totalStrikes += strikes;

            // Save to localStorage
            localStorage.setItem('bowlingStats', JSON.stringify(stats));

            // Update UI
            updateWelcome();
            welcomeModal.close();
            gameForm.reset();
        });
    }

    // Modal controls
    addGameBtn.addEventListener('click', () => welcomeModal.showModal());
    if (closeModal) {
        closeModal.addEventListener('click', () => welcomeModal.close());
    }
    welcomeModal.addEventListener('click', (e) => {
        if (e.target === welcomeModal) welcomeModal.close();
    });

    // Initialize on page load
    updateWelcome();
}

const resultsContainer = document.getElementById('results');
        if (resultsContainer) {
            const params = new URLSearchParams(window.location.search);

            const firstName = params.get('firstname') || 'N/A';
            const lastName = params.get('lastname') || 'N/A';
            const email = params.get('email') || 'N/A';
            const phone = params.get('phone') || 'N/A';
            const membership = params.get('membership') || 'Not selected';
            const org = params.get('org') || 'None provided';
            const description = params.get('description') || 'Not provided';
            const timestamp = new Date().toLocaleString();

            resultsContainer.innerHTML = `
                <p><strong>First Name:</strong> ${firstName}</p>
                <p><strong>Last Name:</strong> ${lastName}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone}</p>
                <p><strong>Submitted:</strong> ${timestamp}</p>
            `;
        }