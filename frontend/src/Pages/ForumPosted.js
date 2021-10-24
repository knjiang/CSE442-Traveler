import React, { useEffect, useState } from "react";
import{ListGroup,ListGroupItem,Button, Modal} from "react-bootstrap";
import {getLocation} from "../apis/locations";
import {useHistory} from "react-router";
import '../components/Forum.css'
import { GetPostByLocation, AddComment, GetCommentFromPost } from '../apis/forums'
import { useCookies } from 'react-cookie';
import { getProfile } from '../apis/profiles';
import ForumComment from '../components/ForumComment';

const ForumPosted = (props) =>{

    const history = useHistory();

    const pathname = window.location.pathname.substr(7)

    const [cookies,setCookie] = useCookies(['token']);

    const [allThreads, setAllThreads] = useState()

    const [show, handleClose] = useState(false)

    const [selectedPost, setSelectedPost] = useState()
    const [selectedComment, setSelectedComment] = useState([])

    const user = props.parentUser
    const setUser = props.parentSetUser 

    useEffect (() => {
        if (cookies.token && !user.logged_in){
            getProfile(cookies.token)
            .then(response => response.json())
            .then(data => {
            if (!data.detail){
                setUser({
                logged_in: true,
                name: data.first_name,
                email: data.email,
                from_location: data.from_location
                })
            }
            })
        }
        GetPostByLocation(cookies.token, pathname.replace('-', ' '))
        .then(response => response.json())
        .then(data => {
            setAllThreads(data)
        })
    }, [])

    const showComments = (id) => {
        GetCommentFromPost(cookies.token, id)
        .then(res => res.json())
        .then(data => {
            setSelectedComment(data)
        })
    }

    const LocationThreads = () => {
        //threads[0] = title, threads[1] = body, threads[2] = location, threads[3] = profile(name), threads[4] = id
        //return data from backend is going to be: 
        // thread => {id: [title, body, location, profile, id]}
        // comment => {id: [[body, profile], [body, profile]]}
        if (allThreads) {
            return (
                <div>
                {Object.values(allThreads).map((threads, index) => (
                        <ListGroupItem id ="threadTitle" className="d-flex" variant="primary" onClick = {() => (setSelectedPost(threads), showComments(threads[4]), handleClose(true))}>
                        <h1>{threads[0]}</h1>
                        <br/>
                        <strong id = "threadTitleText">{threads[3]}</strong>
                        <div className="m-lg-auto">
                            {/* <Button variant="danger">Delete</Button> */}
                        </div>
                        </ListGroupItem>
                    ))}
                </div>
            )
        }
        else {
            return (
                <h1>No locations</h1>
            )
        }
    }

    const submitComment = (e) => {
        e.preventDefault()
        let comment = document.getElementById("commentText").value
        let postID = selectedPost[4]
        AddComment(cookies.token, comment, postID)
    }

    const postComments = () => {
        if (selectedComment) {
            return (
                <div>
                {selectedComment.map((comment, index) => (
                        <ForumComment body={comment.body} user={comment.user} emojis={comment.emoji_list} id={comment.comment_id} />
                    ))}
                </div>
            )
        }
    }

    const showModal = () => {
        if (selectedPost) {
            return(
            <Modal show={show} onHide={() => handleClose(false)}>
                <Modal.Header closeButton>
                <Modal.Title>{selectedPost[2]}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>Title: {selectedPost[0]}</div>
                    <div>Content: {selectedPost[1]}</div>
                    <div>Written by: {selectedPost[3]}</div>
                </Modal.Body>
                {postComments()}
                <Modal.Footer>
                    <form>
                    Post comment: <input style = {{"width": "10vw;"}} id = "commentText"></input>
                    </form>
                <Button variant="secondary" onClick = {(e) => submitComment(e)}>
                    comment
                </Button>
                <Button variant="secondary" onClick={() => handleClose(false)}>
                    Close
                </Button>
                </Modal.Footer>
            </Modal>
            )
        }
        else {
            return (<h1></h1>)
        }
    }


    return(
        <ListGroup className="mt-4">
            <h1>{pathname.replace('-', ' ')}</h1>
            {LocationThreads()}
            {showModal()}

        </ListGroup>
    )

}

export default ForumPosted;