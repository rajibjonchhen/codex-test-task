import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import Loader from '../../Loader'

function ConfirmationPage() {
    const location = useLocation()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        const id = location.pathname.split("/")[2]
        handleConfirm(id)
    }, [])

    const handleConfirm = async(userId) => {
        const baseUrl = "http://localhost:3001"
        try {
            const response = await fetch(
                `${baseUrl}/users/confirm/${userId}`,
                {
                    method: "PUT",
                    headers: {
                        authorization: localStorage.getItem("MyToken"),
                    },  
                }
            )
            if (response.status >= 300) {
                const data = await response.json()
                setError("Error in confirming task")
                setIsLoading(false)
            } else {
                const data = await response.json()
                setIsLoading(false)
            }
        } catch (error) {
            console.log(error)
            setIsLoading(false)
            setError("Could not confirm task")
        }
    }

  return (
    <div>
        {isLoading ? (<Loader/>) : error ? (<div>{error}</div>)
        : ( <div>
        <h1>Confirmation Page</h1>
        <p>Please press the confirm button to verify</p>
        <Button onClick={() => navigate("/")}>Login</Button>
    </div>
        )}
    </div>  

  )
}

export default ConfirmationPage