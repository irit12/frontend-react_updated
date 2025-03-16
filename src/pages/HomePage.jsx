import { useSelector } from "react-redux";
import { StoryList } from "../cmps/StoryList";
import { useEffect } from "react";
import { loadStories, removeStory, updateStory } from "../store/actions/story.actions";

export function HomePage() {

    const stories = useSelector((storeState) => storeState.storyModule.stories)

    // useEffect(() => {
    //     loadStories()
    // }, [])

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


    return (

        <StoryList
            stories={stories}
            onRemoveStory={onRemoveStory}
            onUpdateStory={onUpdateStory}
        />
    )
}