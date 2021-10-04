import React from "react";
import{ListGroup,ListGroupItem,Button} from "react-bootstrap";

const ForumContent = () =>{

    return(
        <ListGroup className="mt-4">
            <ListGroupItem className="d-flex" variant="primary">
                <strong>Post Title</strong>
                <div className="m-lg-auto">
                    <Button variant="danger">Delete</Button>
                </div>
            </ListGroupItem>
        </ListGroup>
    )


}

export default ForumContent;