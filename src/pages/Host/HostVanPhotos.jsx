import React from 'react'
import { useOutletContext } from "react-router-dom";

const Photos = () => {
  const { van } = useOutletContext()

  return (
    <img className='rounded' src={`/images/${van.imageUrl}`} alt='van' width={100}/>
  )
}

export default Photos