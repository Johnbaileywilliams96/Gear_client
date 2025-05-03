"use client"

import { getCurrentUser, updateProfile } from "@/app/data/profiles";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


export default function Edit() {
    const [bio, setBio] = useState("")
    const [originalImagePath, setOriginalImagePath] = useState(null);
    const [profile, setProfile] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [profile_image, setProfileImagePath] = useState(null);
    const [error, setError] = useState(null);
    const params = useParams();
    const router = useRouter()
    const {id} = params;

    useEffect(() => {
        setIsLoading(true);
        getCurrentUser(id)
          .then(data => {
            console.log("Profile data:", data); // For debugging
            setProfile(data);
            setBio(data.bio)
            setOriginalImagePath(data.image_path)
            setIsLoading(false);
          })
          .catch(err => {
            console.error("Error loading profile:", err);
            setError("Failed to load profile data");
            setIsLoading(false);
          });
      }, [id]);

      const getBase64 = (file, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(file);
      };
  
      const createProductImageString = (event) => {
        if (event.target.files && event.target.files[0]) {
          getBase64(event.target.files[0], (base64ImageString) => {
            setProfileImagePath(base64ImageString);
          });
        }
      };

      const handleEditProfile = (e) => {
        e.preventDefault();
        setIsLoading(true); // Set loading to true while submitting

        const profileData = {
            "bio": bio
        };

        if (profile_image) {
            profileData["profile_image"] = profile_image;
        }

        updateProfile(profileData)
            .then(updatedProfile => {
                console.log('Post updated successfully:', updatedProfile);
                router.push(`/profile`); 
            })
            .catch(error => {
                console.error('Failed to update post:', error);
                setIsLoading(false);
                setError('Failed to update post. Please try again.');
            });

            console.log({'profileData': profileData})
    }
    


    return (
        <>
        <h1>Edit Profile</h1>
        <div>
        <form onSubmit={handleEditProfile}>
        <fieldset className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2"> 
            Bio
            </label>
            <input 
            type="text" 
            id="bio"
            value={bio}
            onChange={evt => setBio(evt.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter bio"
            required 
            autoFocus 
            />
        </fieldset>

        <fieldset className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
            Profile Image
            </label>
            {originalImagePath && !profile_image && (
            <div className="mb-4">
                <p className="text-sm text-gray-500 mb-2">Current image:</p>
                <img src={originalImagePath} alt="Current image" className="max-w-full h-auto max-h-48 rounded" />
            </div>
            )}
            <input 
            type="file" 
            id="image_path" 
            onChange={createProductImageString} 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {profile_image && (
            <div className="mt-2">
                <p className="text-sm text-gray-500 mb-2">New image preview:</p>
                <img src={profile_image} alt="Product preview" className="max-w-full h-auto max-h-48" />
            </div>
            )}
        </fieldset>
        <div className="flex items-center justify-center space-x-4">
            <button
            type="button"
            onClick={() => router.push(`/profile/${id}`)}
            className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors"
            >
            Cancel
            </button>
            <button
            type="submit"
            disabled={isLoading}
            className={`
                ${isLoading ? 'bg-yellow-300' : 'bg-yellow-400 hover:bg-yellow-500'} 
                text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors
            `}
            >
            {isLoading ? 'Updating...' : 'Update Post'}
            </button>
        </div>
        </form>

        </div>
        </>
    )
}