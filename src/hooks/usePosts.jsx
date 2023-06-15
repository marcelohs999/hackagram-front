import { useEffect, useState } from "react"
import { getAllPostServices } from "../services"

const usePosts = () => {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')


    useEffect(() => {
        const loadPosts = async () => {
            try{
                setLoading(true)

                const data = await getAllPostServices()

                setPosts(data)

            }catch(error){
              setError(error.message)
            }finally {
                setLoading(false)
            }
        }

        loadPosts()
    }, [])

    return{posts, loading, error}

}

export default usePosts