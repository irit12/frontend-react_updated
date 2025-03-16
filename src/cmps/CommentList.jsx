import { userService } from '../services/user'
import { CommentPreview } from './CommentPreview'

export function CommentList({ comments, onRemoveComment, onUpdateComment }) {
    console.log(comments);
    
    // function shouldShowActionBtns(car) {
    //     const user = userService.getLoggedinUser()
        
    //     if (!user) return false
    //     if (user.isAdmin) return true
    //     return car.owner?._id === user._id
    // }

    return <section>
        <ul>
            {comments.map(comment =>
                <li key={comment.id}>
                    <CommentPreview comment={comment}/>
                    {/* {shouldShowActionBtns(story) && <div className="actions">
                        <button onClick={() => onUpdate(story)}>Edit</button>
                        <button onClick={() => onRemoveStory(story._id)}>x</button>
                    </div>} */}
                </li>)
            }
        </ul>
    </section>
}