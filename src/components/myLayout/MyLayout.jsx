import React from 'react'
import MyNavbar from '../myNavbar/MyNavbar'

function MyLayout({children, user}) {
  return (
    <div>
        <MyNavbar user={user}/>
        {children}

    </div>
  )
}

export default MyLayout