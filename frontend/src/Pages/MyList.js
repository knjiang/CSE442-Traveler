import { useCookies } from 'react-cookie';
import { getProfile, getProfileLists } from '../apis/profiles';
import {useState,useEffect} from "react"
import NotLoggedIn from '../components/NotLoggedIn';

function MyList(){
    const [cookies,setCookie] = useCookies(['token']);

    const [dataList,setList] = useState({
        lists: []
    })

    const [user,setUser] = useState({
        logged_in : false,
        name: "None",
        email: "None",
        from_location: "",
      })

    const existsCookie = typeof cookies.token != "undefined"
    
    useEffect(() => {
        if (existsCookie){
            getProfileLists(cookies.token)
            .then(response => response.json())
            .then(data => {
                setList({
                    lists: data.lists
                })
            });
            getProfile(cookies.token)
            .then(response => response.json())
            .then(data => {
              if (!data.detail){
                setUser({
                  logged_in: true,
                  name: data.first_name,
                  email: data.email,
                  from_location: data.from_location
                });
              }
            });
        }
    }, [])
    const empty_list = () => {
        return dataList.lists.length != 0 
    }
    
    function MyListRender(){
        if (existsCookie){
            return(
            <div>
                Hi {user.name}, here are your lists! 

                <br/>
                <br/>

                <div id = "Lists">
                {empty_list && dataList.lists.map((list, index) => (
                    <div className = "Lists">
                        List #{index + 1} : {list}
                    </div>
                ))}
                </div>
            </div>
            )
        }
        return <NotLoggedIn/>
    }

    return(<MyListRender/>)
}
export default MyList;