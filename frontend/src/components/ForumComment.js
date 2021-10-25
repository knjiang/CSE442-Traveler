function ForumComment(props){
    return (
        <div className= "commentdetails" id={props.id}>
            <p>
                {props.body} - {props.user} {props.emojis}
            </p>  
        </div>  
    );
}

export default ForumComment
