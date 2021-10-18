import React, { useEffect, useState } from "react";
import{ListGroup,ListGroupItem,Button, Modal} from "react-bootstrap";
import {getLocation} from "../apis/locations";
import {useHistory} from "react-router";
import '../components/Forum.css'
import { getUserComment, getUserPost, delUserPost, delUserComment } from '../apis/forums'
import { useCookies } from 'react-cookie';
import { getProfile } from '../apis/profiles';

const MyForum = () =>{

    const history = useHistory();

    const pathname = window.location.pathname.substr(7)

    const [cookies,setCookie] = useCookies(['token']);

    const [allComments, setAllComment] = useState()
    const [allPosts, setAllPost] = useState()

    const [user,setUser] = useState({
        logged_in : false,
        name: "None",
        email: "None",
        from_location: "",
      })

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
                <div>
                    <h1>Your Posts:</h1>
                    {
                    allPosts.map((post, id) => (
                        <div style = {{"display":"flex"}}><h1>Title: {post[1]}, Body: {post[2]}, Location: {post[3]}</h1> <Button onClick ={() => deletePost(post)} >Delete</Button></div>
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
        if (allComments && allComments != []) {
            return (
                <div>
                    <h1>Your Comments:</h1>
                    {
                    allComments.map((comment, id) => (
                        <div style = {{"display":"flex"}}><h1>Comment: {comment[1]}</h1> <Button onClick ={() => deleteComment(comment)} >Delete</Button></div>
                    ))
                    }
                </div>
            )
        }   
        else {
            return (<div></div>)
        }
    }

    return(
        <div>
            {displayPosts()}
            {displayComments()}
        </div>  
    )

}

export default MyForum;