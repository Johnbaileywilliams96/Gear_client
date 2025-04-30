


export function getPosts() {
    return fetch('http://localhost:8000/posts')
            .then(response => response.json())
            .catch(error => console.error('Error fetching posts:', error));
}


export function getPostsById(id) {
    return fetch(`http://localhost:8000/posts/${id}`)
            .then(response => response.json())
            .catch(error => {
                console.error('Error fetching post:', error);
                throw error;
            });
}

export function addPost(postData) {
    // Get the auth info and parse it from JSON
    const authInfo = JSON.parse(localStorage.getItem('gear_token'));
    
    // Check if authInfo exists and contains a token
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
        body: JSON.stringify(postData)
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

export function deletePost(id) {
    try {
        // Get the auth token from localStorage and parse it
        const authInfo = JSON.parse(localStorage.getItem('gear_token'));
        
        if (!authInfo || !authInfo.token) {
            console.error('Authentication token missing or invalid');
            return Promise.reject('Authentication error');
        }
        
        return fetch(`http://localhost:8000/posts/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Token ${authInfo.token}`
            }
        })
        .then(response => {
            if (response.ok) {
                return true;
            } else {
                throw new Error(`Failed to delete post: ${response.status}`);
            }
        });
    } catch (error) {
        console.error('Error in deletePost:', error);
        return Promise.reject(error);
    }
}