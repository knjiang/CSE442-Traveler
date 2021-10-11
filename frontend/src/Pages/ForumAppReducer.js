export default (state, action) => {
    switch(action.type) {
        case 'remove_Post':
            return{
                users: state.users.filter(user => {
                    return user.id !== action.payload
                })
            }
        case 'add_Post':
            return {
                users: [action.payload, ...state.payload]
            }
        default:
            return state
    }
}