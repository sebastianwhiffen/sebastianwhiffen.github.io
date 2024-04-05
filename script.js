const username = "sebastianwhiffen"

function displayProjects(data) {
    const projectsContainer = document.querySelector('.main-frame');
    projectsContainer.innerHTML = ''; 
    
    data.forEach(project => {
        const projectElement = document.createElement('div');
        projectElement.className = 'project';
        
        const projectContent = `
        <h2><a href="${project.html_url}" target="_blank">${project.name}</a></h2>
        <p>${project.description || 'No description'}</p>
        `;
        
        projectElement.innerHTML = projectContent;
        projectsContainer.appendChild(projectElement);
    });
}

function displayGitHubUsername() {
    const hostname = window.location.hostname;
    const username = hostname.split('.')[0];
    const usernameElement = document.querySelector('#usernameElement');

    usernameElement.innerHTML = "https://github.com/" + username;
    usernameElement.href = `https://github.com/${username}`;
}

function loadContent(page) {
    const path = `${page}.html`;
    fetch(path)
    .then((response) => response.text())
    .then((data) => {
        const mainFrame = document.querySelector(".main-frame");
        mainFrame.innerHTML = data;
    })
    .catch((err) => console.error("Failed to load page:", err));
}

function updateContentBasedOnHash() {
    const hash = window.location.hash.replace("#", "") || "about";
    if (hash === "projects") {
        loadGitHubProjects(username);
    } else {
        loadContent(hash); 
    }

    document.querySelectorAll('.navigation a').forEach(navItem => {
        navItem.classList.remove('selected-nav-item');
    });

    const selectedHeaderElement = document.querySelector('.navigation a[href="#' + hash + '"]');
    if (selectedHeaderElement) {
        selectedHeaderElement.classList.add('selected-nav-item');
    }
}


function loadGitHubProjects(username) {
    fetch(`https://api.github.com/users/${username}/repos`)
    .then(response => response.json())
    .then(data => {
        displayProjects(data);
    })
    .catch(error => console.error('Error fetching GitHub repositories:', error));
}

window.addEventListener("hashchange", updateContentBasedOnHash);
document.addEventListener("DOMContentLoaded", updateContentBasedOnHash);
document.addEventListener("DOMContentLoaded", displayGitHubUsername)
