document.addEventListener('DOMContentLoaded', function() {
    const orgName = 'Pwani-University-Tech'; // Replace with your GitHub organization name
    const token = process.env.GITHUB_TOKEN; // Use the GitHub Personal Access Token from environment variables

    const headers = {
        'Authorization': `token ${token}`
    };

    // Fetch organization profile information
    fetch(`https://api.github.com/orgs/${orgName}`, { headers })
        .then(response => response.json())
        .then(data => {
            const profileInfo = document.getElementById('profile-info');
            profileInfo.innerHTML = `
                <img src="${data.avatar_url}" alt="${data.name}" width="100">
                <div>
                    <h3>${data.name}</h3>
                    <p>${data.description}</p>
                    <p><a href="${data.html_url}" target="_blank">View GitHub Profile</a></p>
                </div>
            `;
        });

    // Fetch organization repositories
    fetch(`https://api.github.com/orgs/${orgName}/repos`, { headers })
        .then(response => response.json())
        .then(data => {
            const repoList = document.getElementById('repo-list');
            const liveList = document.getElementById('live-list');
            data.forEach(repo => {
                const listItem = document.createElement('li');
                listItem.innerHTML = `
                    <h3><a href="${repo.html_url}" target="_blank">${repo.name}</a></h3>
                    <p>${repo.description}</p>
                `;
                repoList.appendChild(listItem);

                if (repo.has_pages) {
                    const liveItem = document.createElement('li');
                    liveItem.innerHTML = `
                        <h3><a href="https://${orgName}.github.io/${repo.name}" target="_blank">${repo.name}</a></h3>
                    `;
                    liveList.appendChild(liveItem);
                }
            });
        });

    // Fetch organization public members
    fetch(`https://api.github.com/orgs/${orgName}/public_members`, { headers })
        .then(response => response.json())
        .then(data => {
            console.log('Public Members:', data); // Log the API response
            const membersList = document.getElementById('members-list');
            data.forEach(member => {
                const listItem = document.createElement('li');
                listItem.innerHTML = `
                    <img src="${member.avatar_url}" alt="${member.login}" width="50">
                    <p><a href="${member.html_url}" target="_blank">${member.login}</a></p>
                `;
                membersList.appendChild(listItem);
            });
        });

    // Fetch organization events
    fetch(`https://api.github.com/orgs/${orgName}/events`, { headers })
        .then(response => response.json())
        .then(data => {
            const eventsList = document.getElementById('events-list');
            data.forEach(event => {
                const listItem = document.createElement('li');
                listItem.innerHTML = `
                    <p>${event.type} by <a href="${event.actor.url}" target="_blank">${event.actor.login}</a> at ${new Date(event.created_at).toLocaleString()}</p>
                `;
                eventsList.appendChild(listItem);
            });
        });

    // Fetch organization teams
    fetch(`https://api.github.com/orgs/${orgName}/teams`, { headers })
        .then(response => response.json())
        .then(data => {
            const teamsList = document.getElementById('teams-list');
            data.forEach(team => {
                const listItem = document.createElement('li');
                listItem.innerHTML = `
                    <h3>${team.name}</h3>
                    <p>${team.description}</p>
                `;
                teamsList.appendChild(listItem);
            });
        });

    // Accordion functionality
    /**
     * A NodeList of elements with the class 'accordion-button'.
     * These buttons are used to control the accordion functionality on the page.
     * @type {NodeListOf<Element>}
     */
    const accordionButtons = document.querySelectorAll('.accordion-button');
    accordionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const accordionContent = this.parentElement.nextElementSibling;
            if (!accordionContent) return; // Check if accordionContent exists
            const allContents = document.querySelectorAll('.accordion-content');
            allContents.forEach(content => {
                if (content !== accordionContent) {
                    content.classList.remove('active');
                }
            });
            accordionContent.classList.toggle('active');
        });
    });
});
