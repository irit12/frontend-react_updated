import { useState } from "react"
import "./UserPopup.scss"

export function UserPopup({ user, loggedInUser, onFollow }) {
    const [isHovered, setIsHovered] = useState(false)
    const isFollowing = loggedInUser?.following?.includes(user._id)

    return (
        <div 
            className="user-popup-container"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <img src={user.imgUrl} alt={user.username} className="user-img" />

            {isHovered && (
                <div className="popup-content">
                    <div className="popup-header">
                        <img src={user.imgUrl} alt={user.username} className="popup-user-img" />
                        <span className="popup-username">{user.username}</span>
                    </div>

                    <div className="popup-stats">
                        <span><strong>{user.stories?.length || 0}</strong> Stories</span>
                        <span><strong>{user.followers?.length || 0}</strong> Followers</span>
                        <span><strong>{user.following?.length || 0}</strong> Following</span>
                    </div>

                    {isFollowing ? (
                        <a href={`/messages/${user._id}`} className="popup-btn message-btn">
                            Message
                        </a>
                    ) : (
                        <button 
                            onClick={() => onFollow(user._id)} 
                            className="popup-btn follow-btn"
                        >
                            Follow
                        </button>
                    )}
                </div>
            )}
        </div>
    )
}

//USERSERVICE

// async function handleFollow(userId) {
//     try {
//         const loggedInUser = getLoggedinUser()
//         if (!loggedInUser) throw new Error("No logged-in user")

        
//         const isFollowing = loggedInUser.following.includes(userId)
//         const updatedFollowing = isFollowing
//             ? loggedInUser.following.filter(id => id !== userId) 
//             : [...loggedInUser.following, userId] 

    
//         const updatedUser = { ...loggedInUser, following: updatedFollowing }
        
        
//         await updateUser(updatedUser)
        
//         return updatedUser
//     } catch (err) {
//         console.error("Failed to update follow status", err)
//         throw err
//     }
// }

//STORYLIST

// export function StoryList({ stories, loggedInUser, setLoggedInUser }) {
//     async function onFollow(userId) {
//         try {
//             const updatedUser = await userService.handleFollow(userId)
//             setLoggedInUser(updatedUser) 
//         } catch (err) {
//             console.error("Failed to follow/unfollow user", err)
//         }
//     }

//     return (
//         <ul className="story-list">
//             {stories.map(story => (
//                 <li key={story._id}>
//                     <UserPopup 
//                         user={story.by} 
//                         loggedInUser={loggedInUser} 
//                         onFollow={onFollow} 
//                     />
//                 </li>
//             ))}
//         </ul>
//     )
// }

