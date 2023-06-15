export const getAllPostServices = async () => {
    const backendURL = import.meta.env.VITE_BACKEND;
    const response = await fetch(backendURL)

    const json = await response.json()
    if(!response.ok) {
        throw new Error(json.message)
    }
    return json.data
}

export const getSinglePostService = async (postText) => {
    const backendURL = import.meta.env.VITE_BACKEND;
    const response = await fetch(`${backendURL}/image/${postText}`)
    const json = await response.json()
    if(!response.ok) {
        throw new Error(json.message)
    }
    return json.data
}