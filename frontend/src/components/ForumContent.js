import React, { useEffect, useState, useRef} from "react";
import{ListGroup,ListGroupItem,Button, Pagination} from "react-bootstrap";
import {getLocation} from "../apis/locations";
import {useHistory} from "react-router";
import {Link} from 'react-router-dom'
import './Forum.css'

const ForumContent = () =>{

    const [allLists, setList] = useState()
    const [filteredLists, setFilteredList] = useState()
    const history = useHistory();

    const items = []
    const itemsPerPage = 13
    const [active, setActive] = useState(1)

    useEffect (() => {
        getLocation()
        .then(response => response.json())
        .then(data => {
          if (data){
            setList(data.map(({id, name}) => name))
            setFilteredList(data.map(({id, name}) => name))
          }
        })
    }, []) // if its empty it only renders once

    const goToLocation = (location) =>{       
        history.push('/forum/' + location.replace(/ /g, '-'))
    }

    const LocationThreads = () => {
        if (filteredLists) {
            if (filteredLists.length > itemsPerPage){
                return (
                    <div>
                    {filteredLists.slice((active-1)*itemsPerPage, (active)*itemsPerPage).map((locations, index) => (
                            <ListGroupItem id ="threadTitle" onClick={() => goToLocation(locations)} className="d-flex" variant="primary">
                            <h1 id = "threadTitleText">{locations}</h1>
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
                    <div>
                    {filteredLists.map((locations, index) => (
                            <ListGroupItem id ="threadTitle" onClick={() => goToLocation(locations)} className="d-flex" variant="primary">
                            <h1 id = "threadTitleText">{locations}</h1>
                            <div className="m-lg-auto">
                                {/* <Button variant="danger">Delete</Button> */}
                            </div>
                            </ListGroupItem>
                        ))}
                    </div>
                )
            }
        }
        else {
            return (
                <h1>No locations</h1>
            )
        }
    }

    const renderPagination = () => {
        let pages = (filteredLists.length / itemsPerPage) + 1
        if (pages < 1 && pages > 0){
            pages = 1
        }
        for (let number = 1; number <= pages; number++){
            if (number == active){
                items.push(
                    <Pagination.Item onClick = {() => (setActive(number))} key={number} active={true}>
                      {number}
                    </Pagination.Item>,
                  );
            }
            else {
                items.push(
                    <Pagination.Item onClick = {() => (setActive(number))} key={number} active={false}>
                      {number}
                    </Pagination.Item>,
                  );
            }
        }
        return (
            <Pagination>{items}</Pagination>
        )
    }

    const filterLocations = () => {
        let res = []
        if (allLists){
            for (let m of allLists) {
                if ((m.toLowerCase()).includes((document.getElementById("inputFilterForum").value.toLowerCase()))){
                    res.push(m)
                }
            }
        }
        setFilteredList(res)
    }

    return(
        <div style = {{width: "35vw"}}>
            <div style = {{marginTop: "-3vh", display: "flex", justifyContent:"space-evenly"}}>
                Search Country: <input id = "inputFilterForum" onChange = {() => filterLocations()} style = {{marginLeft: "auto", marginRight: "auto", width: "15vw", height: "4vh"}}/>
    
            </div>
            <div style = {{marginTop: "-1vh", textAlign: "center"}}>
                <ListGroup className="mt-4" style = {{"width": "100%", "display": "flex", height: "70vh"}}>
                    {LocationThreads()}
                </ListGroup>
                <div style = {{width: "100%", display: "flex", justifyContent: "center", marginTop: "2vh"}}>
                    {filteredLists && renderPagination()}
                </div>

            </div>
        </div>


    )

}

export default ForumContent;