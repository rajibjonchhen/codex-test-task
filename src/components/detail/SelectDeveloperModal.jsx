import React, { useEffect, useState } from "react"
import { Form } from "react-bootstrap"
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"

function SelectDeveloperModal({
  setShowDeveloperModal,
  showDeveloperModal,
  project,
  task,
}) {
  const handleClose = () => setShowDeveloperModal(false)
  const handleShow = () => setShowDeveloperModal(true)

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [url, setUrl] = useState("")
  const [selectedDeveloper, setSelectedDeveloper] = useState({});
  const [developers, setDevelopers] = useState([]);
  const [updatedTask, setUpdatedTask] = useState({
    task: "",
    description: "",
    developers: [],
  })

  useEffect(() => {
  fetchDevelopers()

    if (task) {
      setUrl(`http://localhost:3001/tasks/${task?._id}`)
      
      setUpdatedTask({
        task: task.task,
        description: task.description,
        developers: task.developers,
      })
    } else {
      setUrl(`http://localhost:3001/projects/${project?._id}`)
      
    }
  }, [])







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
      setDevelopers(data.developers)
    }
  } catch (error) {
    console.log(error);
    return {error:"Could not fetch developers", isLoading:false}
  }
}

const handleSelect = (developerId) => {
  setSelectedDeveloper(developers.push(developerId))
}

  const handleAssign = async (e) => {
    try {
      const response = await fetch(url, {
        method:"PUT",
        body: JSON.stringify(developers),
        headers: {
          authorization: localStorage.getItem("MyToken"),
          "Content-Type": "application/json",
        },
      })
      if (response.status !== 201 && response.status !== 200) {
        // const data = await response.json()
        setError("Error in saving the changes")
        setIsLoading(false)
      } else {
        console.log("handleSave")
        const data = await response.json()
        console.log(task, data)
        if (task) {
          console.log("with task", data)
          // fetchTask(task._id)
        } else {
          console.log("without task", data)
          // fetchTasks(data.project._id)
          setUpdatedTask({
            task: "",
            description: "",
          })
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
      <Form.Select aria-label="Default select example">
      <option>Select developer</option>
      {developers.map((developer) => 
        <option key={developer.id} value={developer._id} onSelect={() => handleSelect(developer._id)}>{developer.name+" "+developer.surname}</option> 
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
