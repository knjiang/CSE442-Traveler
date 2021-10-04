import React from 'react';
import './Forum.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Link} from 'react-router-dom';
import {Navbar, Nav, NavItem, NavbarBrand, Container} from "reactstrap";
import ForumContent from "./Posts";


function Forum(){

    return(
        <div style={{maxWidth: "30rem", margin: "4rem auto"}}>
            <div id="Posts">
            <Navbar color="dark" dark>
                <Container>
                    <NavbarBrand id="title1" href="/forum">Forum</NavbarBrand>

                    <Nav>
                        <NavItem>
                            <Link className="btn btn-primary" to="/post">Add Post</Link>
                        </NavItem>
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