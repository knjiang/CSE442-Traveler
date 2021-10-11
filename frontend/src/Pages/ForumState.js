import React,{createContext, useReducer} from "react";
import AppReducer from './ForumAppReducer';


const firstState = {
    users: [
        {id: 1, name: 'Post 1'},
        {id: 2, name: 'Post 2'},
        {id: 3, name: 'Post 3'}
    ]
};

export const ForumContext = createContext(firstState)

export const ForumProvider = ({children}) => {
    const [state, dispatch] = useReducer(AppReducer, firstState);

    // Actions
    const removePost = (id) =>{
        dispatch({
            type: 'remove_Post',
            payload: id
        })
    }

    const addPost = (title) =>{
        dispatch({
            type: 'add_Post',
            payload: title
        })
    }

    return (
        <ForumContext.Provider value={{
            users: state.users,
            removePost,
            addPost
        }}>
            {children}
        </ForumContext.Provider>
    )
}
