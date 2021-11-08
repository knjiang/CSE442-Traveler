import React, { useEffect, useState } from "react";
import{ListGroup,ListGroupItem,Button, Modal} from "react-bootstrap";
import {useHistory} from "react-router";
import '../components/Forum.css'
import { getUserComment, getUserPost, delUserPost, delUserComment } from '../apis/forums'
import { useCookies } from 'react-cookie';
import { getProfile } from '../apis/profiles';

function MyForum (props) {

    const history = useHistory();
    const pathname = window.location.pathname.substr(7)
    const [cookies,setCookie] = useCookies(['token']);
    const [allComments, setAllComment] = useState()
    const [allPosts, setAllPost] = useState()
    const user = props.parentUser
    const setUser = props.parentSetUser 
    const existsCookie = typeof cookies.token != "undefined"

    useEffect (() => {
        getUserPost(cookies.token)
        .then(response => response.json())
        .then(data => {
            //p.id, p.title, p.body, p.location.name, p.profile.user.username
            setAllPost(data)
        })
        getUserComment(cookies.token)
        .then(response => response.json())
        .then(data => {
            //p.id, p.body, p.profile.user.username
            setAllComment(data)
        })
    }, [])

    const deletePost = (post) => {
        delUserPost(cookies.token, post[0])
        .then(response => response.json())
        .then(data => {
            //p.id, p.title, p.body, p.location.name, p.profile.user.username
            setAllPost(data[0])
            setAllComment([data[1]])
        })
    }

    const displayPosts = () => {
        if (allPosts && allPosts != []) {
            return (
                <div style = {{overflowWrap: "anywhere", width: "100%"}}>
                    <h1>Your Posts:</h1>
                    {
                    allPosts.map((post, id) => (
                        <div style = {{"display":"flex", justifyContent: "space-between", overflowWrap: "anywhere"}}><h1 style = {{fontSize: '3vh', width: "88%"}}>Title: {post[1]}, Body: {post[2]}, Location: {post[3]}</h1> <Button style = {{width: "5vw", height: "4vh", backgroundColor: "#d65858", fontSize: "1.5vh"}} onClick ={() => deletePost(post)} >Delete</Button></div>
                    ))
                    }
                </div>
            )
        }   
        else {
            return (<div></div>)
        }
    }

    const deleteComment = (comment) => {
        delUserComment(cookies.token, comment[0])
        .then(response => response.json())
        .then(data => {
            //p.id, p.body, p.profile.user.username
            setAllComment(data)
        })
    }

    const displayComments = () => {
        let res = []
        if (allComments && allComments != []) {
            for (let comment of allComments){
                if (comment.length > 0) {
                    res.push (<div style = {{"display":"flex", justifyContent: "space-between", overflowWrap: "anywhere"}}><h1 style = {{fontSize: '3vh', width: "88%"}}>Comment: {comment[1]}</h1> <Button style = {{width: "5vw", height: "4vh", backgroundColor: "#d65858", fontSize: "1.5vh"}} onClick ={() => deleteComment(comment)} >Delete</Button></div>)
                }
            }
            return (
                <div>
                    <h1>Your Comments:</h1>
                    {res}
                </div>
            )
        }   
        else {
            return (<div></div>)
        }
    }

    if (existsCookie){
        return(
            <div>
                {displayPosts()}
                {displayComments()}
            </div>  
        )
    }
    else {
        return (<div>
            You are not logged in
        </div>)
    }
}

export default MyForum;