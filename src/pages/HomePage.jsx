import { ErrorMessage } from "../component/ErrorMessage"
import  {PostList}  from "../component/PostList"
import usePosts from "../hooks/usePosts"


export const HomePage = () => {
    const {posts, loading, error} = usePosts()

    if (loading) return <p>cargando posts...</p>
    if(error) return <ErrorMessage message={error}/>
    
  
    return (
        <>
        
        <section>
            <h1>Ultimas publicaciones</h1>
            <PostList posts={posts}/>
        </section>
        
        </>
    )
    
}