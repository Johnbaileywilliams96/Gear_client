export function addPostTags(postId, tagIds) {
    return fetch(`http://localhost:8000/post-tags/${postId}`, {
        method: 'POST',
        headers: {
            Authorization: `Token ${localStorage.getItem('gear_token')}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ tags: tagIds })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        return response.json();
    })
    .catch(error => {
        console.error('Error adding post tags:', error);
        throw error;
    });
}