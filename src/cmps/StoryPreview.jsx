import { Link, useSearchParams } from 'react-router-dom';
import { calculateTimeGap } from '../services/util.service';
import { MoreHorizontal } from "lucide-react";
import { AddComment } from './AddComment';
import { CommentList } from './CommentList';
import { userService } from "../services/user";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SET_USER } from '../store/reducers/user.reducer';
import { eventBus } from '../services/event-bus.service';



export function StoryPreview({ story, onRemoveStory }) {
    const [searchParams, setSearchParams] = useSearchParams();
    const loggedinUser = useSelector((storeState) => storeState.userModule.user)
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const dispatch = useDispatch()

    function openStoryDetails() {
        searchParams.set("storyId", story._id)
        setSearchParams(searchParams)
    }

    const handleFollow = async (userIdToFollow) => {
        try {
            console.log(loggedinUser);

            // const updatedLoggedinUser = {
            //     ...loggedinUser,
            //     // following: [...loggedinUser.following, {
            //     //     _id: userIdToFollow,
            //     //     fullname: story.by.fullname,
            //     //     imgUrl: story.by.imgUrl
            //     // }]
            // };

            // const updatedFollowedUser = {
            //     ...story.by,
            //     // followers: [...story.by.followers, {
            //     //     _id: loggedinUser._id,
            //     //     fullname: loggedinUser.fullname,
            //     //     imgUrl: loggedinUser.imgUrl
            //     // }]
            // };
            const updatedUser = await userService.follow(story.by._id)
            dispatch({ type: SET_USER, user: updatedUser })





            // setLoggedinUser(updatedLoggedinUser);
            // setStory((prevStory) => ({
            //     ...prevStory,
            //     by: updatedFollowedUser
            // }));


        } catch (error) {
            console.error("Error following user:", error);
        }
    };

    function isFollowing() {
        console.log(loggedinUser);
        if (!loggedinUser) return
        else
            return loggedinUser.following.some(user => user._id === story.by._id)
    }

    function openStoryEdit() {
        eventBus.emit('edit-story', story._id)
        setIsMenuOpen(false);
    }

    async function removeStory() {
        try {
            await onRemoveStory(story._id)
            setIsMenuOpen(false);
        } catch (error) {
            console.log('cannot remove story', error);

        }
    }

    return (<article className="story-preview">
        {/* <header className="user-info">
            <Link to={`/story/${story._id}`}><img src={story.by.imgUrl} alt={story.by.fullname} className="user-img" /></Link>
            <Link className="user-name" to={`/story/${story._id}`}>{story.by.fullname} </Link>
            <span className="view-comments"> &bull;{calculateTimeGap(story.createdTime)}</span>
            { !isFollowing() &&  loggedinUser._id !== story.by._id &&
                <button className="follow-btn" onClick={() => handleFollow(story.by._id)}>
                    Follow
                </button>}
                {loggedinUser._id === story.by._id && (
                            <div className="menu-container">
                                <button className="menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                                    <MoreHorizontal />
                                </button>
                                {isMenuOpen && (
                                    <div className="menu-options">
                                        <button className="delete-btn" onClick={removeStory}>Delete</button>
                                        <button className="edit-btn" onClick={openStoryEdit}>Edit</button>
                                    </div>
                                )}
                            </div>
                        )}
        </header> */}

        <header className="user-info">
            <div className="user-details">
                <Link to={`/story/${story._id}`}>
                    <img src={story.by.imgUrl} alt={story.by.fullname} className="user-img" />
                </Link>
                <Link className="user-name" to={`/story/${story._id}`}>
                    {story.by.fullname}
                </Link>
            </div>
            {loggedinUser._id === story.by._id && (
                <div className="menu-container">
                    <button className="menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        <MoreHorizontal />
                    </button>
                    {isMenuOpen && (
                        <div className="menu-options">
                            <button className="delete-btn" onClick={removeStory}>Delete</button>
                            <button className="edit-btn" onClick={openStoryEdit}>Edit</button>
                        </div>
                    )}
                </div>
            )}
        </header>

        <img src={story.imgUrl} alt={story.txt} className="story-img" />
        <div className="left-icons" >
            <button className="icon-with-text" >
                <i className="far fa-heart"></i>
                <span className="text">Like</span>
            </button>
            <button className="icon-with-text" onClick={openStoryDetails}>
                <i className="far fa-comment"></i>
                <span className="text">Commnet</span>
            </button>
            <button className="icon-with-text">
                <i className="far fa-paper-plane"></i>
                <span className="text">Share</span>
            </button>
        </div>
        <p className="user-name">{story.likedBy.length} likes</p>
        <Link className="user-name" to={`/story/${story._id}`}>{story.by.fullname} </Link>
        <span className="story-txt">{story.txt}</span>
        <p>{story?.comments?.length > 0 && (<button className="view-comments" onClick={openStoryDetails}>View all {story.comments.length} comments</button>)}</p>
        <AddComment storyId={story._id} />
    </article>)
}