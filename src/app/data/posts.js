


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

export function addPost() {
    return fetch('http://localhost:8000/posts', {
        method: 'POST',
        headers: {
            Authorization: `Token ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        }
    })
            .then(response => response.json())
            .catch(error => console.error('Error adding post:', error));
}
