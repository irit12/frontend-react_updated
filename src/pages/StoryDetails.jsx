import { useEffect, useState, useRef } from 'react'
import { useNavigate, useParams, Link, useSearchParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { MoreHorizontal } from "lucide-react";




// import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { loadStory } from '../store/actions/story.actions'
import { CommentList } from '../cmps/CommentList';
import { AddComment } from '../cmps/AddComment';
// import { addComment } from '../store/actions/story.actions';
import { userService } from '../services/user';
import { eventBus } from '../services/event-bus.service';


// const Modal = ({ isOpen, onClose, children }) => {
//     if (!isOpen) return null;

//     return (

//         <div className="modal-overlay" onClick={onClose}>
//             <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//                 <button className="modal-close" onClick={onClose}>
//                     &times;
//                 </button>
//                 {children}
//             </div>
//         </div>

//     );
// };

// export function StoryDetails({ storyId }) {
//     const navigate = useNavigate()
//     // const { storyId } = useParams()
//     const story = useSelector(storeState => storeState.storyModule.story)

//     const openModal = () => setIsModalOpen(true);
//     const closeModal = () => navigate('/')
//     const [isModalOpen, setIsModalOpen] = useState(true);


//     useEffect(() => {
//         console.log("🚀 ~ useEffect ~ storyId:", storyId)
//         loadStory(storyId)
//         openModal()
//     }, [storyId])

//     if (!story) return

//     return (
//         <Modal isOpen={isModalOpen} onClose={closeModal}>
//             <section className="story-details">

//                 <img src={story.imgUrl} alt={story.txt} className="story-img" />

//                 <div className="uploader">
//                     <Link to={`/story/${story._id}`}><img src={story.by.imgUrl} alt={story.by.fullname} className="user-img" /></Link>
//                     <Link className="user-name" to={`/story/${story._id}`}>{story.by.fullname} </Link>
//                 </div>

//                 <div className="info">
//                     <div className="thin-divider"></div>
//                     <div className="story-txt">
//                         <Link to={`/story/${story._id}`}><img src={story.by.imgUrl} alt={story.by.fullname} className="user-img" /></Link>
//                         <Link className="user-name" to={`/story/${story._id}`}>{story.by.fullname} </Link>
//                         <span>{story.txt}</span>

//                     </div>
//                     <CommentList comments={story.comments} />  
//                 </div>




//                 <div className="btm-bar">
//                     <div className="left-icons" >
//                         <button className="icon-with-text" >
//                             <i className="far fa-heart"></i>
//                             <span className="text">Like</span>
//                         </button>
//                         <button className="icon-with-text" >
//                             <i className="far fa-comment"></i>
//                             <span className="text">Commnet</span>
//                         </button>
//                         <button className="icon-with-text">
//                             <i className="far fa-paper-plane"></i>
//                             <span className="text">Share</span>
//                         </button>
//                     </div>

//                     <p className="user-name">{story.likedBy.length} likes</p>
//                     <AddComment storyId={story._id} />
//                 </div>
//             </section>
//         </Modal>
//     )
// }

export function StoryDetails({ storyId, onRemoveStory }) {
    const navigate = useNavigate();
    const story = useSelector((storeState) => storeState.storyModule.story);
    const [isModalOpen, setIsModalOpen] = useState(true);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        loadStory(storyId);
    }, [storyId]);

    if (!story) return null;

    function closeModal () {
        searchParams.delete('storyId')
        setSearchParams(searchParams)
        
    }

    function openStoryEdit () {
        eventBus.emit('edit-story' , storyId)
        closeModal()
    }

    async function removeStory(){
        try {
            await onRemoveStory(storyId)
            closeModal()
        } catch (error) {
            console.log('cannot remove story', error  );
            
        }
    }

    const user = userService.getLoggedinUser();
    const isOwner = user && story.by?._id === user._id;

    return (
        <div className="modal-overlay" onClick={closeModal}>
            <div className="story-modal" onClick={(e) => e.stopPropagation()}>
                {/* <button className="close-btn" onClick={closeModal}>×</button> */}


                <div className="story-img-container">
                    <img src={story.imgUrl} alt={story.txt} className="story-img" />
                </div>

                <div className="story-info">
                    <div className="story-header">
                        <Link to={`/user/${story.by._id}`} className="uploader">
                            <img src={story.by.imgUrl} alt={story.by.fullname} className="user-img" />
                            <span className="user-name">{story.by.fullname}</span>
                        </Link>

                        {isOwner && (
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
                    </div>


                    <div className="story-txt">
                        <span>{story.txt}</span>
                    </div>


                    <CommentList comments={story.comments} />


                    <div className="btm-bar">
                        <AddComment storyId={story._id} />
                    </div>
                </div>
            </div>
        </div>
    );
}