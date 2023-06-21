import React, {useState,useEffect,useContext} from "react";

const AuthContext = React.createContext({})
export function useAuth(){
    return useContext(AuthContext);
}
export function AuthProvider(props){
    const [authUser,setAuthUser] = useState(null);
    const [isloggedin,setIsloggedin] = useState(false);
    const [currentChat, setCurrentChat] = useState(null);
    const value = {
        authUser,
        setAuthUser,
        isloggedin,
        setIsloggedin,
        currentChat,
        setCurrentChat
    }
    return (
        <AuthContext.Provider value={value}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext;
