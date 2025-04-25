


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
                throw error; // Re-throw the error so calling code can handle it
            });
}