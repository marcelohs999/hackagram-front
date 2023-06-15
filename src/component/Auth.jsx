import { Link } from "react-router-dom"

export const Auth = () => {
    return (
        <ul>
            <li><Link to='/user'> Register </Link> </li> 
            <li><Link to='/login'> Login </Link> </li> 
          
        </ul>
    )
}