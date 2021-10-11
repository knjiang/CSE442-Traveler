import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom';
import {Navbar, Nav, NavbarBrand, Container} from "react-bootstrap";
import ForumContent from "../components/ForumContent";
import {ForumProvider} from "./ForumState";
import ForumForm from "../components/ForumAdd";

function Forum(){
    // const [resourceType, setResourceType] = useState('forum')

    useEffect(() =>{
    <ForumContent></ForumContent>
    }, [])

    return(
        <div style={{maxWidth: "30rem", margin: "4rem auto"}}>
            <ForumProvider>
                <div id="Posts">
            <Navbar bg="dark" variant="dark">
                <Container>
                    <NavbarBrand id="title1" href="/forum">Traveler Forum</NavbarBrand>
                    <Nav>
                        <ForumForm/>
                            <button id="new Forum" ><a href = "/forum">  New Forum </a></button>
                            <Link className="btn btn-success" to="/post" >New Post</Link>
                    </Nav>
                </Container>

            </Navbar>
        </div>
            <button id="home" ><a href = "/"> Return to HomePage </a></button>
            <ForumContent></ForumContent>

            </ForumProvider>
        </div>

    )
}

export default Forum;