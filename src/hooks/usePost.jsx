import {useEffect, useState} from "react"
import {getPostsfromUserService} from "../services"

const usePost = (username) => {
    const [posts, setPosts] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect (() => {
        const loadPost = async () => {
            try{
                setLoading(true)

                const data = await getPostsfromUserService(username)
                setPosts(data)
            }catch(error) {
                setError(error.message)

            } finally {
                 setLoading(false)
            }
        }
        loadPost()
    }, [username])
    return { posts, loading, error}
}
export default usePost