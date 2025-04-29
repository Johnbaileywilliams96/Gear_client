export function getProfiles() {
    return fetch('http://localhost:8000/profiles')
            .then(response => response.json())
            .catch(error => console.error('Error fetching posts:', error));
}

export function getProfileById(id) {
    return fetch(`http://localhost:8000/profiles/${id}`, {
      headers: {
        // Include authorization if needed
        'Authorization': `Token ${JSON.parse(localStorage.getItem('gear_token')).token}`
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      return response.json();
    })
    .catch(error => {
      console.error('Error fetching profile:', error);
      throw error;
    });
  }
