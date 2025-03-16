import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
// import { CreateStory } from "./CreateStory";  
import { StoryEdit } from "./StoryEdit";
import { userService } from "../services/user";
import { eventBus } from "../services/event-bus.service";
import { logout } from "../store/actions/user.actions";


export function NavBar() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [storyId, setStoryId] = useState('');
    const loggedinUser = userService.getLoggedinUser();
    const loggedinUserId = loggedinUser._id
    const navigate = useNavigate()

    useEffect(() => {
        const unsubscribe = eventBus.on('edit-story', (storyId) => {
            setIsModalOpen(true)
            setStoryId(storyId)
        })
        return unsubscribe
    }, [])

    function onLogout() {

        logout()
        navigate('login')


    }

    return (
        <>
            <nav className="nav-bar">

                <h1>InstaPic</h1>

                <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
                    <i className="fas fa-home"></i> Home
                </NavLink>
                <NavLink to="search" className={({ isActive }) => (isActive ? "active" : "")}>
                    <i className="fas fa-search"></i> Search
                </NavLink>
                <NavLink to="explore" className={({ isActive }) => (isActive ? "active" : "")}>
                    <i className="fas fa-compass"></i> Explore
                </NavLink>

                <button className={isModalOpen ? "nav-link active" : "nav-link"}
                    onClick={() => setIsModalOpen(true)}
                >               <i className="fas fa-square-plus"></i> Create
                </button>
                <NavLink to={`/user/${loggedinUserId}`} className={({ isActive }) => (isActive ? "active" : "")}>Profile</NavLink>
                <button onClick={onLogout}>Log out</button>


            </nav>
            {isModalOpen && <StoryEdit storyId={storyId} closeModal={() => setIsModalOpen(false)} />}
        </>

    )
}