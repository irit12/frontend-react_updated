import { userService } from '../services/user'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { ImgUploader } from '../cmps/ImgUploader'
import { storyService } from '../services/story/'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import {  addStory } from '../store/actions/story.actions'






export function CreateStory  ({ closeModal })  {
  
  async function onCreateStory() {
    const story = storyService.getEmptyStory()
    story.txt = prompt('Insert here your text')
    try {
        const savedStory = await addStory(story)
        showSuccessMsg(`Story added (id: ${savedStory._id})`)
    } catch (err) {
        showErrorMsg('Cannot add story')
    }
  }

    return (<article className="create-story">
      <div className="modal-overlay">
        <div className="modal-content">
          {<button onClick={onCreateStory}>Create new story</button>}
          <ImgUploader />
          <button onClick={closeModal} className="close-btn">✖</button>
        </div>
      </div>
    </article>);
  };
  