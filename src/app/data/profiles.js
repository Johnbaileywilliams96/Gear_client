export function getProfiles() {
    return fetch('http://localhost:8000/profiles')
            .then(response => response.json())
            .catch(error => console.error('Error fetching posts:', error));
}

export function getProfileById(id) {
    const authInfo = JSON.parse(localStorage.getItem('gear_token'));
    
    if (!authInfo || !authInfo.token) {
        console.error('No authentication token found');
        return Promise.reject('Not authenticated');
    }
    return fetch(`http://localhost:8000/profiles/${id}`, {

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

export const addProfile = async (profileData, token) => {
    const authToken = token || JSON.parse(localStorage.getItem('gear_token')).token;
    
    const response = await fetch('http://localhost:8000/profiles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify(profileData)
    });
    
    if (!response.ok) {
      throw new Error(`Error creating profile: ${response.statusText}`);
    }
    
    return await response.json();
  };


  export function getCurrentUser() {
    const authInfo = JSON.parse(localStorage.getItem('gear_token'));
    
    if (!authInfo || !authInfo.token) {
        console.error('No authentication token found');
        return Promise.reject('Not authenticated');
    }
    return fetch(`http://localhost:8000/profiles/current_user_profile`, {

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