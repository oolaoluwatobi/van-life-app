import React from 'react'
import { useOutletContext } from 'react-router-dom';

const HostVanInfo = () => {
  const { van } = useOutletContext()
  
  return (
    <div className=' text-sm'>
      <h4 className='font-bold '>Name: <span className='font-normal'>{van.name}</span></h4>
      <h4 className='font-bold mt-4'>Category: <span className='font-normal capitalize'>{van.type}</span></h4>
      <p className='font-bold mt-4'>Description: <span className='font-normal'>{van.description}</span></p>
      <h4 className='font-bold mt-4'>Visibility: <span className='font-normal capitalize'>public</span></h4>
    </div>
  )
}

export default HostVanInfo