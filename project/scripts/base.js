// Hamburger menu
document.getElementById('ham-btn').addEventListener('click', () => {
    document.getElementById('ham-btn').classList.toggle('show');
    document.getElementById('nav-bar').classList.toggle('show');
});

// Footer copyright
const footer = document.querySelector('footer');
const year = new Date().getFullYear();
footer.innerHTML = `&copy; ${year} Bowling Stat Aggregator | Last modified: ${document.lastModified}`;

// Premium modal
const modal = document.getElementById('premium-modal');
document.getElementById('premium-btn')?.addEventListener('click', () => modal.showModal());
document.querySelector('.close-btn')?.addEventListener('click', () => modal.close());
modal.addEventListener('click', (e) => { if (e.target === modal) modal.close(); });

// Discover page last-visit message (if you keep discover.html)
// if (location.pathname.includes('discover.html')) {
//     const msg = document.getElementById('visit-message');
//     const now = Date.now();
//     const last = localStorage.getItem('lastVisit');
//     if (!last) msg.textContent = "Welcome! Let us know if you have any questions.";
//     else {
//         const days = Math.floor((now - last) / 86400000);
//         msg.textContent = days < 1 ? "Back so soon! Awesome!" : `You last visited ${days} day${days>1?'s':''} ago.`;
//     }
//     localStorage.setItem('lastVisit', now);
// }

myinfo = new URLSearchParams(window.location.search)
console.log(myinfo)
document.querySelector('#results').innerHTML = `
<p>First Name: ${myinfo.get('first name')}
<p>Last Name: ${myinfo.get('lastname')}
<p>Email: ${myinfo.get('email')}
<p>Phone: ${myinfo.get('phone')}
<p>Membership: ${myinfo.get('audience')}
<p>Orgaization: ${myinfo.get('org')}
`