export function getComments() {
    return fetch('http://localhost:8000/comments')
            .then(response => response.json())
            .catch(error => console.error('Error fetching posts:', error));
}