document.addEventListener('DOMContentLoaded', () => {
    console.log("navigation.js loaded!");

    // ELEMENTS 
    const navbutton = document.querySelector('#ham-btn');
    const navBar = document.querySelector('#nav-bar');
    const allButton = document.querySelector('#allButton');
    const wddButton = document.querySelector('#wddButton');
    const cseButton = document.querySelector('#cseButton');
    const footer = document.querySelector('footer');

    //  HAMBURGER MENU 
    navbutton.addEventListener('click', () => {
        navbutton.classList.toggle('show');
        navBar.classList.toggle('show');
    });
    

    //  FOOTER: YEAR + LAST MODIFIED 
    const currentYear = new Date().getFullYear();
    const lastModified = new Date(document.lastModified).toLocaleString();

    const footerP = document.createElement('p');
    footerP.innerHTML = `
        &copy; ${currentYear} | Bridger Fronk <br>
        Last Modified: ${lastModified}
    `;
    footer.appendChild(footerP);

    //  COURSES DATA 
    const courses = [
        {
            subject: 'CSE', number: 110, title: 'Introduction to Programming',
            credits: 2, certificate: 'Web and Computer Programming',
            description: 'Intro to variables, loops, and problem-solving.',
            technology: ['Python'], completed: true
        },
        {
            subject: 'WDD', number: 130, title: 'Web Fundamentals',
            credits: 2, certificate: 'Web and Computer Programming',
            description: 'Intro to HTML, CSS, and web design.',
            technology: ['HTML', 'CSS'], completed: true
        },
        {
            subject: 'CSE', number: 111, title: 'Programming with Functions',
            credits: 2, certificate: 'Web and Computer Programming',
            description: 'Functions, debugging, and reusable code.',
            technology: ['Python'], completed: true
        },
        {
            subject: 'CSE', number: 210, title: 'Programming with Classes',
            credits: 2, certificate: 'Web and Computer Programming',
            description: 'OOP, encapsulation, inheritance.',
            technology: ['C#'], completed: true
        },
        {
            subject: 'WDD', number: 131, title: 'Dynamic Web Fundamentals',
            credits: 2, certificate: 'Web and Computer Programming',
            description: 'JavaScript events and interactivity.',
            technology: ['HTML', 'CSS', 'JavaScript'], completed: true
        },
        {
            subject: 'WDD', number: 231, title: 'Frontend Web Development I',
            credits: 2, certificate: 'Web and Computer Programming',
            description: 'Accessibility, UX, performance.',
            technology: ['HTML', 'CSS', 'JavaScript'], completed: false
        }
    ];

    // CLASS CARDS 
    function generateClassCards(courseData) {
        const classArea = document.querySelector('.courses');
        if (!classArea) {
            console.error("'.courses' container not found!");
            return;
        }
        classArea.innerHTML = ''; // Clear

        courseData.forEach(course => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.setAttribute('data-subject', course.subject);

            const content = document.createElement('div');
            content.innerHTML = `
                <strong>${course.subject} ${course.number}</strong><br>
                <em>${course.title}</em><br>
                Credits: ${course.credits} | ${course.completed ? 'Completed' : 'In Progress'}
            `;

            card.appendChild(content);
            classArea.appendChild(card);
        });
    }

    generateClassCards(courses);

    // FILTER BUTTONS 
    if (allButton && wddButton && cseButton) {

        allButton.addEventListener('click', () => {
            setActive(allButton);
            document.querySelectorAll('.card').forEach(card => {
                card.style.display = 'block';
            });
        });

        wddButton.addEventListener('click', () => {
            setActive(wddButton);
            document.querySelectorAll('.card').forEach(card => {
                const subject = card.getAttribute('data-subject');
                card.style.display = subject === 'WDD' ? 'block' : 'none';
            });
        });

        cseButton.addEventListener('click', () => {
            setActive(cseButton);
            document.querySelectorAll('.card').forEach(card => {
                const subject = card.getAttribute('data-subject');
                card.style.display = subject === 'CSE' ? 'block' : 'none';
            });
        });
    } else {
        console.error("Filter buttons not found!");
    }
});