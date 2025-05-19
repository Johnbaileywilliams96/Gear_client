


export function getPosts() {
    const authInfo = JSON.parse(localStorage.getItem('gear_token'));
    
    if (!authInfo || !authInfo.token) {
        console.error('No authentication token found');
        return Promise.reject('Not authenticated');
    }
    return fetch('http://localhost:8000/posts', {

        headers: {
        'Authorization': `Token ${authInfo.token}`,
        'Content-Type': 'application/json'
}})
            .then(response => response.json())
            .catch(error => console.error('Error fetching posts:', error));
}


export function getPostsById(id) {
    const authInfo = JSON.parse(localStorage.getItem('gear_token'));
    
    if (!authInfo || !authInfo.token) {
        console.error('No authentication token found');
        return Promise.reject('Not authenticated');
    }
    return fetch(`http://localhost:8000/posts/${id}`, {

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

export function addPost(postData) {
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

export function editPost(id, postData) {
    const authInfo = JSON.parse(localStorage.getItem('gear_token'));
    
    if (!authInfo || !authInfo.token) {
        console.error('No authentication token found');
        return Promise.reject('Not authenticated');
    }
    
    return fetch(`http://localhost:8000/posts/${id}`, {
        method: 'PUT',
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
        console.error('Error updating post:', error);
        throw error;
    });
}