import { useEffect, useState } from "react"
import { getLocation } from "../apis/locations";
import { changeList, getList } from '../apis/profiles';
import { Link } from 'react-router-dom'

/*This is the page that shows the location the user clicked*/

function Specific_Location (props) {

  const [currentLocation,setLocation] = useState(false)

  const [realLocation,setReal] = useState(false)

  const [savedLists,setLists] = useState([])

  useEffect (() => {
    if (!currentLocation){
      console.log("Getting path")
      const pathname = props.location.pathname.substr(11)
      if (pathname){
        setLocation(pathname)
        console.log(pathname, currentLocation)
      }
    }
    else{
      getLocation()
      .then(response => response.json())
      .then(data => {
        if (data){
          let realLocations = (data.map(({id, name}) => name))
          if (realLocations.includes(currentLocation)){
            setReal(true)
          }
        }
      })
    }
  })

  const check_location = props.location.pathname.slice(0, 10);
  if (check_location != '/locations'){
        return(<h1>The following page does not exist, please check your spelling</h1>)
  }
  return(
    <div>
        <h1>Welcome to {currentLocation}</h1>
        <button >Save to list</button>
        <Link to = '/'><button>Homepage</button></Link>
        <p>{realLocation}, {currentLocation}</p>
    </div>
    )
}

export default Specific_Location 