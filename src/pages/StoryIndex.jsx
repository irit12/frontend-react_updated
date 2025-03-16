import React, { useState } from 'react'
import { NavLink, Outlet, useSearchParams } from 'react-router-dom'
import PropTypes from 'prop-types'
import { NavBar } from '../cmps/NavBar'
import { useEffect } from 'react'
import { loadStories, removeStory, updateStory } from '../store/actions/story.actions'
import { useSelector } from 'react-redux'
import { StoryList } from '../cmps/StoryList'
import { StoryDetails } from './StoryDetails'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
// import { storyService } from '../services/story'

export function StoryIndex() {

    // TODO:
    // useSearchParams
    const [searchParams, setSearchParams] = useSearchParams()

    // const stories = useSelector((storeState) => storeState.storyModule.stories)
    // console.log("🚀 ~ StoryIndex ~ stories:", stories)

    const storyId = searchParams.get('storyId');
    // console.log("🚀 ~ StoryIndex ~ storyId:", storyId)

    // const Search = () => {
    //   const [searchParams, setSearchParams] = useSearchParams();
    //   const query = searchParams.get('query');
    //   const page = searchParams.get('page');

    //   return (
    //     <div>
    //       <p>Query: {query}</p>
    //       <p>Page: {page}</p>
    //       <button onClick={() => setSearchParams({ query: 'redux', page: 1 })}>
    //         Update Search
    //       </button>
    //     </div>
    //   );
    // };


    // TODO
    // Get storyId from searchParams

    // const params = useParams()

    // useEffect(() => {
    //     const storyId = params.storyId; 
    //     loadStory(storyId);
    // }, [params.storyId]);

    useEffect(() => {
        loadStories()
    }, [])

    async function onRemoveStory(storyId) {
        try {
            await removeStory(storyId)
            showSuccessMsg('story removed')
        } catch (err) {
            showErrorMsg('Cannot remove story')
        }
    }

    async function onUpdateStory(story) {
        // console.log(story);

        const txt = prompt('Edit txt', story.txt)
        // console.log(txt);

        if (!txt) return
        const storyToSave = { ...story, txt }
        try {
            console.log(storyToSave);

            const savedStory = await updateStory(storyToSave)
            console.log(savedStory);

            // showSuccessMsg(`Story updated`)
        } catch (err) {
            console.log(err, 'couldnt update story');

            showErrorMsg('Cannot update story')
        }
    }
    // console.log('📢 onUpdateStory in StoryPage:', onUpdateStory)

    return (
        <section className="story-index main-layout">

            <NavBar />
            <Outlet />
            
            {/* TODO */}
            {/* Render StoryDetails only if I have storyId */}
            {/* Pass storyId to StoryDetails as prop */}
            {storyId && <StoryDetails storyId={storyId}
                onRemoveStory={onRemoveStory} />}

            {/* <StoryList stories={stories}/> */}


        </section>
    )
}



