import { useParams } from "react-router"
import { userService } from "../services/user"
import { useEffect, useState } from "react"
// import { Card } from "../../../components/ui/card";
import { Loader2 } from "lucide-react";
import { useSelector } from "react-redux";
import { StoryPreview } from "../cmps/StoryPreview";

export function UserPage() {

  // const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const stories = useSelector((storeState) => storeState.storyModule.stories)
  console.log(stories);


  useEffect(() => {
    loadMoreStories();
  }, []);

  const loadMoreStories = () => {
    if (!hasMore) return;
    setLoading(true);
    setTimeout(() => {
      const newStories = user.stories.slice(stories.length, stories.length + 6);
      setStories([...stories, ...newStories]);
      setHasMore(newStories.length > 0);
      setLoading(false);
    }, 1000);
  };


  const [user, setUser] = useState(null)
  const params = useParams()

  useEffect(() => {
    loadUser(params.userId)

  }, [params.userId])

  async function loadUser(userId) {
    const user = await userService.getById(userId)
    setUser(user)
  }

  if (!user) return

  return (
    <div className="user-page">
      {/* User Info */}
      <div className="user-info">
        <img src={user.imgUrl} alt={user.fullname} className="user-img" />
        <div>
          <h2 className="username">{user.username}</h2>
          <div className="stats">
            <span>{user.stories.length} Stories</span>
            <span>{user.followers.length} Followers</span>
            <span>{user.following.length} Following</span>
          </div>
        </div>
      </div>

      {/* {stories.map(story =>
        <li key={story._id}>
          <StoryPreview story={story} onRemoveStory={onRemoveStory} />
        </li>)} */}

      {/* User Stories */}
      {/* <div className="stories-grid">
        {stories.map((story, idx) => (
          <Card key={idx} className="story-card">
            <img src={story.by.imgUrl} alt={story.txt} className="story-img" />
          </Card>
        ))}
      </div> */}

      {/* Load More */}
      {/* {hasMore && (
        <div className="load-more">
          {loading ? (
            <Loader2 className="spinner" />
          ) : (
            <button onClick={loadMoreStories} className="load-more-btn">
              Load More
            </button>
          )}
        </div>
      )} */}

    </div>
  );

}