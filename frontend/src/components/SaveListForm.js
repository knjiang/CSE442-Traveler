
import React, {useState, useEffect} from 'react';
import { changeList, getList } from '../apis/profiles';
import { useCookies } from 'react-cookie';
import { useTextInput} from '../hooks/text-input';

function SaveListForm(props){

    const [list,setList] = useState({
        name: "",
        lists: []
      })

    const cookies = props.parentCookies
    const user = props.parentUser

    const {value:listName,bind:listNameBind,reset:resetListName } = useTextInput('')
    const {value:locationList,bind:locationListBind,reset:resetLocationList } = useTextInput('')

    const handleSubmit = (e) => {
        e.preventDefault()
        changeList(cookies.token,listName,locationList)
        resetListName()
        resetLocationList()
      }

    useEffect(() => {
        if (cookies.token && !user.logged_in){
            getList(cookies.token)
            .then(response => response.json())
            .then(data =>{
            console.log(data)
            if (!data.detail){
                setList({lists: (data.map(({id, name}) => [name]))})
                }
            })
        }
    }, [])

    return (
        <div>
        <form onSubmit = {(e) => handleSubmit(e)}>
                <label>
                Create new list:
                <br/>
                <p>List name:<input type="text" {...listNameBind} /> </p>
                <br/>
                <p>Locations:<input type="text" {...locationListBind}/></p>
                </label>
                <input type="submit" value="Submit"/>
            </form>
            <p>Your saved list[s]: {list.lists}</p>
        </div>
    )
}

export default SaveListForm;