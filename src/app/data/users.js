export function getUsers() {
    return fetch('http://localhost:8000/users')
            .then(response => response.json())
            .catch(error => console.error('Error fetching posts:', error));
}


export function getUserById(id) {
    const authInfo = JSON.parse(localStorage.getItem('gear_token'));
    
    if (!authInfo || !authInfo.token) {
        console.error('No authentication token found');
        return Promise.reject('Not authenticated');
    }
    return fetch(`http://localhost:8000/users/${id}`, {

        headers: {
        'Authorization': `Token ${authInfo.token}`,
        'Content-Type': 'application/json'
}})
    
            .then(response => response.json())
            .catch(error => {
                console.error('Error fetching post:', error);
                throw error;
            });
}