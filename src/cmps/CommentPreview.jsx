import { Link } from 'react-router-dom'
import { calculateTimeGap } from '../services/util.service'


export function CommentPreview({ comment }) {
    

    return (<article className="comment-preview">
        <header>
            <Link to={`/comment/${comment._id}`}><img src={comment.by.imgUrl} alt={comment.by.fullname} className="user-img" /></Link>
            <Link  className="user-name" to={`/comment/${comment._id}`}>{comment.by.fullname}  </Link>
            <span className="comment-txt">{comment.txt}</span>
        </header>
        
        
        {/* <span className="comment-txt">{comment.likedBy.length} likes</span>       */}
        <span className="comment-txt">{calculateTimeGap(comment.createdTime)}</span>
        
    </article>)
}
