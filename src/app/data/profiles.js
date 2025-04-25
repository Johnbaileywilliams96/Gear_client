export function getProfiles() {
    return fetch('http://localhost:8000/profiles')
            .then(response => response.json())
            .catch(error => console.error('Error fetching posts:', error));
}

