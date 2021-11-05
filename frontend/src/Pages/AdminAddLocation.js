import { useEffect, useState, useRef } from "react";
import { getLocation, addLocation, delLocation } from "../apis/locations";
import {Button} from 'react-bootstrap'
import { useCookies } from 'react-cookie';

/*This is the page that shows the location the user clicked*/

function AdminAddLocation () {

    const [location, setLocation] = useState({
        location: []
      })

    const [localName, setLocalName] = useState()
    const wsURL = useRef()
    const ws = useRef()
    const [cookies,setCookie] = useCookies(['token']);
    let subprotocol = cookies.token
    
    useEffect(() => {
        getLocation()
        .then(response => response.json())
        .then(data => {
            if (data){
            setLocation({location: (data.map(({id, name}) => name))})
            }
        })
        var ws_scheme = window.location.protocol == "https:" ? "wss" : "ws";
        if (window.location.hostname == 'localhost') {
            wsURL.current = ws_scheme + '://' + window.location.hostname + ':8000/api/chat/'
        }
        else {
            wsURL.current = ws_scheme + '://' + window.location.hostname + '/api/chat/'
        }
        ws.current = new WebSocket(wsURL.current, subprotocol)
    }, [])

    const setName = (e) => {
        e.preventDefault()
        if (localName) {
            addLocation(localName)
        }
        setLocalName()
        getLocation()
        .then(response => response.json())
        .then(data => {
            if (data){
            setLocation({location: (data.map(({id, name}) => name))})
            }
        })
    }

    const setAllName = (e) => {
        e.preventDefault()
        let con = ["North America", "South America", "Oceania", "Europe", "Asia", "Africa"]
        for (let c of con){
            addLocation(c)
        }
        getLocation()
        .then(response => response.json())
        .then(data => {
            if (data){
            setLocation({location: (data.map(({id, name}) => name))})
            }
        })
    }

    const delName = (e, con) => {
        e.preventDefault()
        delLocation(con)
        setLocalName()
        getLocation()
        .then(response => response.json())
        .then(data => {
            if (data){
            setLocation({location: (data.map(({id, name}) => name))})
            }
        })
    }

    const returnLocation = () => {
        let res = []
        for (let con of location["location"]){
            res.push(<h3 >|{con}|<Button onClick = {(e) => delName(e, con)}>Delete</Button></h3>)
        }
        return (<div style = {{"display":"flex"}}>{res}</div>)
    }

    const deleteAllM = () => {
        let payload = ({
          "status": "DELETEALL",
      })
        ws.current.send(JSON.stringify(payload))
      }
  

    return(
        <div>
            <br/>
            <h3>Current available locations are: </h3>
            {returnLocation()}
            <br/>
            <form style = {{"textAlign":"center"}}>
                Enter location name
                <input type = "text" onChange = {(e) => setLocalName(e.target.value)}></input>
                <button onClick = {(e) => setName(e)}>Add</button>
                <button onClick = {(e) => setAllName(e)}>Add all continents</button>
            </form>
            <button style = {{"width": "5vw", "backgroundColor": "red", "textAlign": "center"}} onClick = {() => deleteAllM()}>DELETE All Messages (FOR TESTING ONLY)</button>
        </div>
    )
}

export default AdminAddLocation;