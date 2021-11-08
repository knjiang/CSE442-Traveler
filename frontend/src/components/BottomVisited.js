import { useEffect,useState, useRef } from "react";
import { useCookies } from "react-cookie";
import { getDescription} from '../apis/profiles'


function BottomVisited(props){
    const dataList = props.dataList
    const selectedList = props.selectedList
    const selectList = props.selectList
    const cookies = props.cookies

    const[showDescriptions,setShowDescriptions] = useState()
    const[descriptions,setDescriptions] = useState()

    useEffect (() => {
        if (descriptions == undefined && selectedList) {
            getDescription(cookies.token, selectedList)
            .then(res => res.json())
            .then(data => {
                if (data["listDescriptions"].length < 1){
                    setShowDescriptions(false)
                }
                else {
                    setShowDescriptions(true)
                    setDescriptions(data["listDescriptions"])
                    
                }
            })
        }
    }, [descriptions, showDescriptions])

    const returnListName = () => {
        let idx = 0;
        if (typeof dataList != 'undefined'){
            let res = [<div><h1 stlye = {{textAlign: 'right', display: "block", width: 700}}></h1></div>]
            
            for (let name of Object.keys(dataList)){
                if (idx < 5){
                    if (name == selectedList){
                        res.push(<h1 style = {{textAlign: 'left', margin: 'auto' }}>{name} </h1>)
                    }
                    else {
                        res.push(<h5 style = {{textAlign: 'left', marginLeft:500,  }}>{name}</h5>)
                    }
                }
                idx++;
            }
            return(res)
        }
    }


    const returnBottomLeft = () => {
        return (
            <div  id = "bottomLeftListWrapper">
                <div style = {{display: "inline-block"}}>
                    {returnListName()}
                </div>
            </div>
        )
    }

    const returnBottomRight = () => {
        return (
            <div id = "bottomRightListWrapper">
                {selectedList} Is listed as a favorite on "My Lists"
            </div>
        )
    }

    return(
        <div style = {{textAlign: 'center'}} id = "bottomListWrapper">
            {returnBottomLeft()}
        </div>
    )
}
export default BottomVisited;