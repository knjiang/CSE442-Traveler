import React, { useEffect, useState} from "react";
import{ListGroup,ListGroupItem,Button} from "react-bootstrap";
import {getLocation} from "../apis/locations";
import {useHistory} from "react-router";
import './Forum.css'

const ForumContent = () =>{

    const [allLists, setList] = useState()
    const history = useHistory();

    useEffect (() => {
        getLocation()
        .then(response => response.json())
        .then(data => {
          if (data){
            setList(data.map(({id, name}) => name))
          }
        })
    }, []) // if its empty it only renders once

    const goToLocation = (location) =>{       
        history.push('/forum/' + location.replace(' ', '-'))
    }

    const LocationThreads = () => {
        if (allLists) {
            return (
                <div>
                {allLists.map((locations, index) => (
                        <ListGroupItem id ="threadTitle" onClick={() => goToLocation(locations)} className="d-flex" variant="primary">
                        <strong id = "threadTitleText">{locations}</strong>
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

    return(
        <ListGroup className="mt-4">
            {LocationThreads()}
        </ListGroup>
    )

}

export default ForumContent;