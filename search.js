// Search functionality
function performSearch() {
    const searchInput = document.getElementById('search-input');
    const searchQuery = searchInput.value.trim();
    const searchEngine = document.getElementById('search-engine').value;

    if (searchQuery === '') return;

    let searchUrl;
    switch(searchEngine) {
        case 'google':
            searchUrl = `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`;
            break;
        case 'bing':
            searchUrl = `https://www.bing.com/search?q=${encodeURIComponent(searchQuery)}`;
            break;
        case 'duckduckgo':
            searchUrl = `https://duckduckgo.com/?q=${encodeURIComponent(searchQuery)}`;
            break;
        case 'youtube':
            searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(searchQuery)}`;
            break;
        case 'github':
            searchUrl = `https://github.com/search?q=${encodeURIComponent(searchQuery)}`;
            break;
        default:
            searchUrl = `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`;
    }

    window.open(searchUrl, '_blank');
}

// Quick links functionality
const quickLinks = {
    'social': {
        'Facebook': 'https://www.facebook.com',
        'Twitter': 'https://www.twitter.com',
        'Instagram': 'https://www.instagram.com',
        'LinkedIn': 'https://www.linkedin.com'
    },
    'entertainment': {
        'YouTube': 'https://www.youtube.com',
        'Netflix': 'https://www.netflix.com',
        'Spotify': 'https://www.spotify.com',
        'Twitch': 'https://www.twitch.tv'
    },
    'productivity': {
        'Gmail': 'https://mail.google.com',
        'Drive': 'https://drive.google.com',
        'GitHub': 'https://github.com',
        'ChatGPT': 'https://chat.openai.com'
    }
};

function createQuickLinks() {
    const container = document.getElementById('quick-links');
    
    for (const category in quickLinks) {
        const section = document.createElement('div');
        section.className = 'quick-links-section';
        
        const title = document.createElement('h3');
        title.textContent = category.charAt(0).toUpperCase() + category.slice(1);
        section.appendChild(title);
        
        const linksList = document.createElement('div');
        linksList.className = 'links-grid';
        
        for (const [name, url] of Object.entries(quickLinks[category])) {
            const link = document.createElement('a');
            link.href = url;
            link.target = '_blank';
            link.className = 'quick-link';
            link.textContent = name;
            linksList.appendChild(link);
        }
        
        section.appendChild(linksList);
        container.appendChild(section);
    }
}

// Initialize quick links when the page loads
document.addEventListener('DOMContentLoaded', createQuickLinks);

// Search suggestions
function showSearchSuggestions() {
    const input = document.getElementById('search-input');
    const suggestions = document.getElementById('search-suggestions');
    
    if (input.value.length > 0) {
        suggestions.style.display = 'block';
        // Here you could implement real search suggestions
        // For now, we'll just show some dummy suggestions
        suggestions.innerHTML = `
            <div class="suggestion">Search "${input.value}" on Google</div>
            <div class="suggestion">Search "${input.value}" on YouTube</div>
            <div class="suggestion">Search "${input.value}" on GitHub</div>
        `;
    } else {
        suggestions.style.display = 'none';
    }
}

// Add event listeners for search input
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', showSearchSuggestions);
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
});
