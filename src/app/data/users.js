export function getUsers() {
    return fetch('http://localhost:8000/users')
            .then(response => response.json())
            .catch(error => console.error('Error fetching posts:', error));
}
