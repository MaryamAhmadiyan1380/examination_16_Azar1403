

export const initialState = {
    username : '',
    password : '',
    token : null,
}

export const reducer = (state , action) => {
    switch(action.type) {
        case "set_username" :
            return {...state, username : action.payload}
        case "set_password" :
            return {...state , password : action.payload}
        case "get_token" :
            return {...state , token : action.payload}
        default : return state
    }
}

