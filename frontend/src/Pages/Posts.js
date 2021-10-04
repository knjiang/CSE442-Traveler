import React from "react";
import {Link} from 'react-router-dom';
import{ListGroup,ListGroupItem,Button} from "reactstrap";

const Posts = () =>{

    return(
        <ListGroup className="mt-4">
            <ListGroupItem className="d-flex">
                <strong>Post #number</strong>
                <div className="m-lg-auto">
                    <Button color="danger">Delete</Button>
                </div>
            </ListGroupItem>
        </ListGroup>
    )


}

export default Posts;