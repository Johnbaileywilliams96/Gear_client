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

// data/likes.js

export const toggleLike = async (postId) => {
    try {
      const authInfoString = localStorage.getItem('gear_token');
      if (!authInfoString) {
        throw new Error('No authentication token found');
      }
      
      const authInfo = JSON.parse(authInfoString);
      const token = authInfo.token;
      
      const response = await fetch('http://localhost:8000/likes/toggle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        },
        body: JSON.stringify({ post: postId })
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Like toggle failed with status:", response.status);
        console.error("Error details:", errorText);
        throw new Error(`Error toggling like: ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error("Like toggle error:", error);
      throw error;
    }
  };