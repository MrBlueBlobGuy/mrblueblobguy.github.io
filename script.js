// Function to apply dark mode if the user had it enabled
function applyDarkMode(isDark) {
    if (isDark) {
        document.body.classList.add('dark-mode');
        document.getElementById('theme-toggle').textContent = 'Light Mode';
    } else {
        document.body.classList.remove('dark-mode');
        document.getElementById('theme-toggle').textContent = 'Dark Mode';
    }
}

// Load the saved dark mode state from localStorage
const darkModeEnabled = localStorage.getItem('darkMode') === 'true';
applyDarkMode(darkModeEnabled);

// Toggle the dark mode on button click
document.getElementById('theme-toggle').addEventListener('click', function() {
    const isDarkMode = document.body.classList.toggle('dark-mode');

    // Update button text
    this.textContent = isDarkMode ? 'Light Mode' : 'Dark Mode';

    // Save the dark mode state to localStorage
    localStorage.setItem('darkMode', isDarkMode);
});

// Function to fetch repositories from GitHub
async function fetchGitHubProjects() {
    const username = 'MrBlueBlobGuy'; // Replace with your GitHub username
    const apiUrl = `https://api.github.com/users/${username}/repos`;

    try {
        const response = await fetch(apiUrl);
        const repos = await response.json();

        // Only display repos that are public
        const publicRepos = repos.filter(repo => !repo.private);

        displayProjects(publicRepos);
    } catch (error) {
        console.error('Error fetching GitHub projects:', error);
    }
}

// Function to display the fetched projects on the page
function displayProjects(repos) {
    const projectsContainer = document.getElementById('projects-container');

    // Clear any existing content
    projectsContainer.innerHTML = '';

    if (repos.length === 0) {
        projectsContainer.innerHTML = '<p>No public projects found on GitHub.</p>';
        return;
    }

    repos.forEach(repo => {
        const projectElement = document.createElement('div');
        projectElement.classList.add('project-item');

        projectElement.innerHTML = `
            <h3><a href="${repo.html_url}" target="_blank">${repo.name}</a></h3>
            <p>${repo.description || 'No description available.'}</p>
            <p><strong>Language:</strong> ${repo.language || 'Not specified'}</p>
        `;

        projectsContainer.appendChild(projectElement);
    });
}

// Call the fetch function on page load
document.addEventListener('DOMContentLoaded', fetchGitHubProjects);
