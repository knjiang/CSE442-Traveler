import React, {useContext, useEffect} from "react";
import{ListGroup,ListGroupItem,Button} from "react-bootstrap";


const ForumContent = () =>{

    // useEffect(() => {
    //     getForum()
    //     .then(response => response.json())
    //     .then(data => {
    //      console.log(data)
    //     })
    // })

    return(
        <ListGroup className="mt-4">
                <ListGroupItem className="d-flex" variant="primary">
                <strong>Post #</strong>
                <div className="m-lg-auto">
                    <Button variant="danger">Delete</Button>
                </div>
            </ListGroupItem>
        </ListGroup>
    )

}

export default ForumContent;