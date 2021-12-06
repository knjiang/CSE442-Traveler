import React, { useEffect, useState } from "react";
import{ListGroup,ListGroupItem,Button, Modal} from "react-bootstrap";
import {getLocation} from "../apis/locations";
import '../components/Forum.css'
import { GetPostByLocation, AddComment, GetCommentFromPost } from '../apis/forums'
import { useCookies } from 'react-cookie';
import { getProfile } from '../apis/profiles';
import ForumComment from '../components/ForumComment';
import ShareTag from '../components/ShareTag';
import { Link } from 'react-router-dom'

const SpecificForum = (props) =>{

    const pathname = window.location.pathname.substr(7)

    const [cookies,setCookie] = useCookies(['token']);

    const [allThreads, setAllThreads] = useState()

    const [show, handleClose] = useState(false)

    const [selectedPost, setSelectedPost] = useState()
    const [selectedComment, setSelectedComment] = useState([])
    const [showPicker, setShowPicker] = useState(false)
    const user = props.parentUser
    const setUser = props.parentSetUser 
    const [showTag, setShowTag] = useState(false)
    const [selectedTag, setSelectedTag] = useState()

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
        GetPostByLocation(cookies.token, pathname.replace(/-/g, ' '))
        .then(response => response.json())
        .then(data => {
            setAllThreads(data)
        })
    }, [])

    const showComments = (id) => {
        setSelectedComment()
        GetCommentFromPost(cookies.token, id)
        .then(res => res.json())
        .then(data => {
            setSelectedComment(data)
        })
    }
    const tagPerson = (postID) => {
        console.log(postID)
        setSelectedTag(postID)
        setShowTag(true)
        console.log('hi')
    }
    const callbackTagModal = () => {
        setShowTag(false)
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
                        <div id = "threadWrapper" onClick = {() => (setSelectedPost(threads), showComments(threads[4]), handleClose(true))}>
                            <div style = {{display: "flex", justifyContent: "space-between", width: "95%", marginLeft: "auto", marginRight: "auto", paddingTop: "1vh", paddingBottom: "1vh"}}>
                                <h1 style = {{fontSize: "3.5vh", "maxWidth": "120vh",whiteSpace: "wrap", overflowWrap: "anywhere"}}>{threads[0]}</h1>
                                <h1 style = {{marginTop: "auto", overflowWrap: "anywhere"}} id = "threadTitleText">Posted by: {threads[3]}</h1>
                                <br/>
                                <Button variant="secondary" id = "tagBTN" onClick = {(evt) => (evt.stopPropagation(),tagPerson(threads[4]))}> Tag </Button> 
                            </div>
                        </div>
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

    const handlePicker = () => {
        if (showPicker) {
            setShowPicker(false)
        }
    }

    const submitComment = (e) => {
        e.preventDefault()
        let comment = document.getElementById("commentText").value
        let postID = selectedPost[4]
        if (comment.length > 0){
            AddComment(cookies.token, comment, postID)
            .then(res => res)
            .then(data => {
                showComments(postID)
            })
        }
        document.getElementById("commentText").value = ''
    }

    const postComments = () => {
        if (selectedComment) {
            return (
                <div >
                {selectedComment.map((comment, index) => (
                        <ForumComment handlePicker = {handlePicker} showPicker = {showPicker} setShowPicker = {setShowPicker} body={comment.body} user={comment.user} emojis={comment.emoji_list} id={comment.comment_id} />
                    ))}
                </div>
            )
        }
    }

    const showModal = () => {
        if (selectedPost) {
            return(
            <Modal show={show} onHide={() => (handleClose(false))}>
                <Modal.Header closeButton>
                <Modal.Title>{selectedPost[2]}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div style = {{maxWidth: "40vw", overflowWrap: "anywhere", marginBottom: "0.2rem"}}><h1 style = {{fontSize: "2vh", fontWeight: "800", marginBottom: "-0.2rem"}}>Title: </h1>{selectedPost[0]}</div>
                    <div style = {{maxWidth: "40vw", overflowWrap: "anywhere", marginBottom: "0.2rem"}}><h1 style = {{fontSize: "2vh", fontWeight: "800", marginBottom: "-0.2rem"}}>Content: </h1>{selectedPost[1]}</div>
                    <div style = {{maxWidth: "40vw", overflowWrap: "anywhere", marginBottom: "0.2rem"}}><h1 style = {{fontSize: "2vh", fontWeight: "800", marginBottom: "-0.2rem"}}>Written by: </h1>{selectedPost[3]}</div>
                </Modal.Body>
                {postComments()}
                <Modal.Footer>
                    <form onSubmit = {(e) => (e.preventDefault(), submitComment(e))}>
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
        <ListGroup className="mt-4" onClick={() => handlePicker()} >
            <h1>{pathname.replace(/-/g, ' ')}</h1>
            <Link style = {{height: "2rem", display: "flex", justifyContent: "center", textAlign: "center", fontSize: "2vh", width: "8rem"}} className="btn btn-success" to={{pathname: "/post", state: {"country": pathname}}}>New Post</Link>
            {LocationThreads()}
            {showModal()}
            <ShareTag cookies = {cookies} show = {showTag} postID = {selectedTag} callback = {callbackTagModal}/>
        </ListGroup>
    )

}

export default SpecificForum;