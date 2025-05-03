export function getLikes() {
    return fetch('http://localhost:8000/likes')
            .then(response => response.json())
            .catch(error => console.error('Error fetching posts:', error));
}

export function getLikesById(id){
    return fetch(`http://localhost:8000/likes/${id}`)
            .then(response => response.json())
            .catch(error => console.error('Error fetching comments:', error));
}

export function addLike(id) {
    const authInfo = JSON.parse(localStorage.getItem('gear_token'));
    
    if (!authInfo || !authInfo.token) {
        console.error('No authentication token found');
        return Promise.reject('Not authenticated');
    }
    
    return fetch('http://localhost:8000/posts', {
        method: 'POST',
        headers: {
            'Authorization': `Token ${authInfo.token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(id)
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(err => {
                console.error('Server error:', err);
                throw new Error(err.detail || `Error: ${response.status}`);
            });
        }
        return response.json();
    })
    .catch(error => {
        console.error('Error adding post:', error);
        throw error;
    });
}