import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom';
import {Navbar, Nav, NavbarBrand, Container} from "react-bootstrap";
import ForumContent from "./ForumContent";

function Forum(){
    const [resourceType, setResourceType] = useState('forum')

    useEffect(() =>{
    <ForumContent></ForumContent>
    }, [])

    return(
        <div style={{maxWidth: "30rem", margin: "4rem auto"}}>
            <div id="Posts">
            <Navbar bg="dark" variant="dark">
                <Container>
                    <NavbarBrand id="title1" href="/forum">Traveler Forum</NavbarBrand>
                    <Nav>
                            <Link className="btn btn-success" to="/post" >New Post</Link>
                    </Nav>
                </Container>

            </Navbar>
        </div>
            <button id="home" ><a href = "/"> Return to HomePage </a></button>
            <ForumContent></ForumContent>
        </div>

    )
}

export default Forum;