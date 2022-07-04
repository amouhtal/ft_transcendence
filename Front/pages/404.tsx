import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
const Error = () => {
    const router = useRouter()
  useEffect(() =>{
    {router.push({pathname: '/errorPage/404'})}
  },[])
  return (
    <>
    </>
  )
}

export default Error
