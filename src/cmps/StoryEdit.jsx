import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { userService } from '../services/user'
import { storyService } from "../services/story"
import { addStory, updateStory } from "../store/actions/story.actions.js"
import { ImgUploader } from "./ImgUploader.jsx"

export function StoryEdit({ closeModal, storyId }) {

    const [storyToEdit, setStoryToEdit] = useState(storyService.getEmptyStory())
    // const navigate = useNavigate()
    // const params = useParams()

    useEffect(() => {
        console.log(storyId);
        
        if (storyId) loadStory()
    }, [])

    //for editing
    async function loadStory() {
        try {
            const storyToEdit = await storyService.getById(storyId)
            setStoryToEdit(storyToEdit)
        } catch (err) {
            console.log('err:', err)
        }
    }

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value || ''
                break;

            case 'checkbox':
                value = target.checked
                break

            default:
                break;
        }
        setStoryToEdit(prevStoryToEdit => ({ ...prevStoryToEdit, [field]: value }))
    }

    // async function onSaveStory(ev) {
    //     ev.preventDefault()
    //     try {
    //         storyService.save(storyToEdit)
    //         navigate('/story')
    //     } catch (err) {
    //         console.log('err:', err)
    //     }
    // }

    async function onSaveStory(ev) {
        ev.preventDefault()
        try {
            if (storyId) await updateStory(storyToEdit)
            
            else await addStory(storyToEdit)
            // console.log(storyToEdit);
            
            // showSuccessMsg(`Story added (id: ${savedStory._id})`)
        } catch (err) {
            showErrorMsg('Cannot add story')
        }
      }

      function onUploaded(imgUrl) {
        setStoryToEdit(prevStory => ({ ...prevStory, imgUrl }))
    }

    const { txt } = storyToEdit
    
    return (
        <article className="story-edit">
            <div className="modal-overlay">
            <div className="modal-content">
            <form onSubmit={onSaveStory} >
                <label htmlFor="txt">txt:</label>
                <input onChange={handleChange} value={txt} type="text" name="txt" id="txt" />
                <ImgUploader onUploaded={onUploaded} />
                <button>Save</button>
                <button onClick={closeModal} className="close-btn">✖</button>
            </form>
            </div>
            </div>
        </article>
    )}
    