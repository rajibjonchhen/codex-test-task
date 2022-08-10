import React, { useEffect } from 'react'

function Home() {

    useEffect(()=> {
        fetchProjects()
    },[])

    const fetchProjects = async () => {
        try {
            const res = await fetch(`${process.env.REACT_APP_PROD_BE_UR}/projects`)
        } catch (error) {
            
        }
    }

  return (
    <div>
        
    </div>
  )
}

export default Home