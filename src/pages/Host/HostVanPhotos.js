import React from 'react'
import { useParams } from "react-router-dom";

import server from "../../server/server";

const Photos = () => {
  const { id } = useParams()
  
  const vans = server.vans
  const van = vans.find(van => van.id == id)

  return (
    <img className='rounded' src={`/images/${van.imageUrl}`} alt='van-image' width={100}/>
  )
}

export default Photos