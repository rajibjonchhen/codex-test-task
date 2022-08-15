import React, { useEffect, useState } from "react"
import { Form } from "react-bootstrap"
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import { useLocation } from "react-router-dom"

function SelectDeveloperModal({
  setShowDeveloperModal,
  showDeveloperModal,
  project,
  setProject,
  task,
  setTask,
}) {
  const handleClose = () => setShowDeveloperModal(false)
  const handleShow = () => setShowDeveloperModal(true)

  const location = useLocation()

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [url, setUrl] = useState("")
  const [allDevelopers, setAllDevelopers] = useState([]);
  const [developer, setDeveloper] = useState("");
  

  useEffect(() => {
  fetchDevelopers()
    console.log(window.location.pathname)
    if (task) {
      setUrl(`http://localhost:3001/tasks/${task?._id}/developers`)
    } else {
      setUrl(`http://localhost:3001/projects/${project?._id}/developers`)
      
    }
  }, [])

  useEffect(()=> {
    console.log("developer-%--",developer)

  },[developer])

const fetchDevelopers = async () => {
  const baseUrl = "http://localhost:3001"
  try {
    const response = await fetch(baseUrl + `/users/developers`, {
      method: "GET",
      headers: { 
        "authorization": localStorage.getItem("MyToken"),
      }})
    if (response.status !== 200 && response.status !== 201) {
      // const data = await response.json();
      console.log({status:response.status, message:response.message});
      return {error:"Error in fetching developers", isLoading:false};
    }
    else {
      const data = await response.json();
      console.log(data)
      setAllDevelopers(data.developers)
    }
  } catch (error) {
    console.log(error);
    return {error:"Could not fetch developers", isLoading:false}
  }
}




  const handleAssign = async (e) => {
    console.log("developer---",developer)
    try {
      const response = await fetch(url, {
        method:"PUT",
        body: JSON.stringify({developer}),
        headers: {
          authorization: localStorage.getItem("MyToken"),
          "Content-Type": "application/json",
        },
      })
      if (response.status !== 201 && response.status !== 200) {
        // const data = await response.json()
        console.log("with error")

        setError("Error in saving the changes")
        setIsLoading(false)
      } else {
        console.log("handleSave")
        const data = await response.json()
        if (task) {
          console.log("with task", data)
          setTask(data.task)
        } else {
          console.log("with project", data.project)
          setProject(data.project)          
        }
        setIsLoading(false)
        setShowDeveloperModal(false)
        handleClose()
      }
    } catch (error) {
      console.log(error)
      setError("Could not fetch developers")
      setIsLoading(false)
    }
  }

  

  return (
    <Modal show={showDeveloperModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Select Developer</Modal.Title>
      </Modal.Header>
      <Modal.Body> 
        <p>Project - {project?.title}</p>
      <Form.Select aria-label="Default select example" onChange={(e) => setDeveloper(e.target.value)}>
      <option value="" >Select developer</option>
      {allDevelopers.map((developer, i) => 
        <option key={i} value={developer._id} >{developer.name+" "+developer.surname}</option> 
      )}
    </Form.Select>
      </Modal.Body>
      <Modal.Footer>
        <Button
          className="no-box-shadow"
          variant="secondary"
          onClick={handleClose}
        >
          Close
        </Button>
        <Button variant="primary" onClick={() => handleAssign()}>
          Assign
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default SelectDeveloperModal
