import { useState, useRef, useEffect } from 'react'
import { Form, Link, useNavigate, useOutletContext, useParams } from "react-router-dom";
import { useForm } from '../customHooks/useForm';
import { addComment } from '../store/actions/story.actions';
import { Smile } from "lucide-react";
import EmojiPicker from "emoji-picker-react";


export function AddComment({ storyId }) {
    const [comment, setComment] = useState("");
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const commentRef = useRef(null);

    function onEmojiClick(emoji) {
        setComment(prev => prev + emoji.emoji);
        commentRef.current.textContent += emoji.emoji; // מוסיף את האימוג'י מידית
        setShowEmojiPicker(false);
    }

    async function onAddComment(ev) {
        ev.preventDefault();
        if (!comment.trim()) return;

        try {
            await addComment(storyId, { txt: comment });
            setComment("");
            commentRef.current.textContent = "Add a comment..."; // מאפס את התיבה
        } catch (err) {
            console.log("Could not add comment", err);
        }
    }

    return (
        <div className="comment-container">
            <form onSubmit={onAddComment} className="comment-form">
                <div className="emoji-wrapper">
                    <Smile className="emoji-icon" onClick={() => setShowEmojiPicker(!showEmojiPicker)} />
                    {showEmojiPicker && <EmojiPicker onEmojiClick={onEmojiClick} />}
                </div>
                <div
                    ref={commentRef}
                    contentEditable
                    className="comment-input"
                    onInput={(e) => setComment(e.currentTarget.textContent)}
                    onBlur={(e) => !comment && (e.currentTarget.textContent = "Add a comment...")}
                    onFocus={(e) => e.currentTarget.textContent === "Add a comment..." && (e.currentTarget.textContent = "")}
                >
                    Add a comment...
                </div>
                <button
                    type="submit"
                    className={`post-btn ${comment.trim() ? "active" : ""}`}
                >
                    Post
                </button>
            </form>
        </div>
    );
}