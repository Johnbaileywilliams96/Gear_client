export function getComments() {
    return fetch('http://localhost:8000/comments')
            .then(response => response.json())
            .catch(error => console.error('Error fetching posts:', error));
}

export function getCommentsById(id){
    return fetch(`http://localhost:8000/comments/${id}`)
            .then(response => response.json())
            .catch(error => console.error('Error fetching comments:', error));
}

export function postComment(postId, commentData) {
    // Get the auth info and parse it from JSON
    const authInfo = JSON.parse(localStorage.getItem('gear_token'));
    
    // Check if authInfo exists and contains a token
    if (!authInfo || !authInfo.token) {
        console.error('No authentication token found');
        return Promise.reject('Not authenticated');
    }
    
    // Create the complete comment data with the post ID
    const completeCommentData = {
        post: postId,  // Include the post ID
        content: commentData.content
    };
    
    return fetch('http://localhost:8000/comments', {
        method: 'POST',
        headers: {
            'Authorization': `Token ${authInfo.token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(completeCommentData)
    })
    .then(response => {
        if (!response.ok) {
            // For better error handling
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                return response.json().then(err => {
                    throw new Error(err.message || `Error: ${response.status}`);
                });
            } else {
                throw new Error(`Server error: ${response.status}`);
            }
        }
        return response.json();
    });
}