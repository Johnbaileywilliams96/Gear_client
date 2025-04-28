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

export function postComment(){
    return fetch('http://localhost:8000/comments', {
        method: 'POST',
        headers: {
            Authorization: `Token ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        }
    })
            .then(response => response.json())
            .catch(error => console.error('Error fetching posts:', error));

}