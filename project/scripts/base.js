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

// ========== BOWLING STATS WITH LOCALSTORAGE ==========
const welcomeMessage = document.getElementById('welcome-message');
const addGameBtn = document.getElementById('add-game-btn');
const welcomeModal = document.getElementById('add-game-modal');
const closeModal = document.querySelector('.close-modal');
const gameForm = document.getElementById('game-form');

// Only run bowling stats logic if elements exist (on home page)
if (welcomeMessage && addGameBtn && welcomeModal) {
    // Load stats from localStorage or initialize
    let stats = JSON.parse(localStorage.getItem('bowlingStats')) || {
        games: [],
        high: 0,
        low: 300,
        totalStrikes: 0
    };

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

// ========== JOIN FORM RESULTS PAGE (Thank You Page) ==========
const resultsContainer = document.getElementById('results');
if (resultsContainer) {
    const params = new URLSearchParams(window.location.search);

    // Safely get values with fallbacks
    const firstName = params.get('first name') || params.get('firstname') || 'N/A';
    const lastName = params.get('lastname') || params.get('last name') || 'N/A';
    const email = params.get('email') || 'N/A';
    const phone = params.get('phone') || 'N/A';
    const membership = params.get('audience') || params.get('membership') || 'Not selected';
    const org = params.get('org') || params.get('organization') || 'None provided';
    const timestamp = new Date().toLocaleString();

    resultsContainer.innerHTML = `
        <h2>Thank You for Joining!</h2>
        <div style="background: #f0f8ff; padding: 1.5rem; border-radius: 10px; margin: 1rem 0;">
            <p><strong>First Name:</strong> ${firstName}</p>
            <p><strong>Last Name:</strong> ${lastName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Membership Level:</strong> ${membership}</p>
            <p><strong>Organization/Business:</strong> ${org}</p>
            <p><strong>Submitted on:</strong> ${timestamp}</p>
        </div>
        <p>We'll be in touch soon!</p>
    `;
}