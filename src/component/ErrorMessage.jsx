import {Link} from "react-router-dom"
import PropTypes from 'prop-types'

export const ErrorMessage = ({message}) => {
    return (
        <>
        
        <p>{message}</p>
        <Link to="/">Vuelve al Home</Link>
        
        </>
    )
}

ErrorMessage.propTypes = {
    message: PropTypes.string
  };