import {useEffect, useState} from "react"

const usePost = (id) => {
    const [post, setPost] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect (() => {
        const loadPost = async () => {
            try{
                setLoading(true)

                const data = await
            }catch(error) {

            } finally {

            }
        }
    }, [post_text])
    return { post, loading, error}



}