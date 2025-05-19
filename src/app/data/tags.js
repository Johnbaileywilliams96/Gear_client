export function getTags() {
    return fetch('http://localhost:8000/tags')
            .then(response => response.json())
            .catch(error => console.error('Error fetching posts:', error));
}

