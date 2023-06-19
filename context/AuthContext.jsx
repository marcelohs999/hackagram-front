import { createContext, useState , useEffect} from "react";
import PropTypes from "prop-types";
import { getMyUserDataService } from "../src/services";


export const AuthContext = createContext();

export const AuthProviderComponent = ({children}) => {
const[token, setToken] = useState(localStorage.getItem("token"))
const[user, setUser] = useState(null)
 

useEffect(() => {
    localStorage.setItem('token', token)
}, [token])

useEffect (() => {
    const getUserData = async () => {
        try{
            const data = await getMyUserDataService({token})
            setUser(data)
        }catch(error){
            logout()
        }
    }
    if(token) getUserData()
},[token])

const login = (token) => {
    setToken(token)
}


const logout = () => {
    setToken('')
    setUser(null)
}
    return (
        <AuthContext.Provider value={{token, user, login, logout}}>{children}</AuthContext.Provider>
    
    )
}

AuthProviderComponent.propTypes = {
    children: PropTypes.node.isRequired,
  };