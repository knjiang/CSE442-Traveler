import { useEffect, useState } from "react";
import { getLocation, addLocation, delLocation } from "../apis/locations";

/*This is the page that shows the location the user clicked*/

function AdminAddLocation () {

    const [location, setLocation] = useState({
        location: []
      })

    const [localName, setLocalName] = useState()
    
    useEffect(() => {
    getLocation()
    .then(response => response.json())
    .then(data => {
        if (data){
        setLocation({location: (data.map(({id, name}) => name))})
        }
    })
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

    const delName = (e) => {
        e.preventDefault()
        if (localName) {
            delLocation(localName)
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

    const returnLocation = () => {
        return (<h3>{location["location"].join(', ')}</h3>)
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
                <button onClick = {(e) => delName(e)}>Delete</button>
            </form>
        </div>
    )
}

export default AdminAddLocation;