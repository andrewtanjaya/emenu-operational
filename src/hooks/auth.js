import { createContext, useContext, useReducer } from "react";

const initialState = {auth : false};

const authContext = createContext(initialState);

export function reducer(state, action){
    switch (action.type){
        case 'LOGIN':
            return {auth : true};
        case 'LOGOUT':
            return {auth : false};
        default:
            throw new Error()
    }
}

export function AuthProvider({children}){
    const[authed, dispatch] = useReducer(reducer, initialState);

    return (<authContext.Provider value={[authed, dispatch]}>{children}</authContext.Provider>);
}

export default function AuthConsumer(){
    return useContext(authContext);
}