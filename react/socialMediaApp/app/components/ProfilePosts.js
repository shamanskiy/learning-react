import React, { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"

import Axios from "axios"
import LoadingDotsIcon from "./LoadingDotsIcon"

function ProfilePosts() {
  // pull username parameter from the URL
  const { username } = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const request = Axios.CancelToken.source()

    async function fetchPosts() {
      try {
        const response = await Axios.get(`/profile/${username}/posts`, { cancelToken: request.token })
        setPosts(response.data)
        setIsLoading(false)
      } catch (error) {
        console.log("There was a problem or a request was canceled")
      }
    }
    fetchPosts()

    // a clean up function to run when the component is unmounted
    return () => {
      request.cancel()
    }
  }, [])

  if (isLoading) return <LoadingDotsIcon />

  return (
    <div className="list-group">
      {posts.map((post) => {
        const date = new Date(post.createdDate)
        const dateFormatted = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
        return (
          <Link key={post._id} to={`/post/${post._id}`} className="list-group-item list-group-item-action">
            <img className="avatar-tiny" src={post.author.avatar} /> <strong>{post.title}</strong>{" "}
            <span className="text-muted small">on {dateFormatted} </span>
          </Link>
        )
      })}
    </div>
  )
}

export default ProfilePosts
