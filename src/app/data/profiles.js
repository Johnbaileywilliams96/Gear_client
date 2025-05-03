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

// Example function to update a user's profile
export const updateProfile = async (profileData) => {
    try {
      const authInfoString = localStorage.getItem('gear_token');
      if (!authInfoString) {
        throw new Error('No authentication token found');
      }
      
      const authInfo = JSON.parse(authInfoString);
      const token = authInfo.token;
      
      const response = await fetch('http://localhost:8000/profiles/update_current_user_profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        },
        body: JSON.stringify(profileData)
      });

      console.log({"profileData updateProfile": profileData})
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Profile update failed with status:", response.status);
        console.error("Error details:", errorText);
        throw new Error(`Error updating profile: ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error("Profile update error:", error);
      throw error;
    }
  };