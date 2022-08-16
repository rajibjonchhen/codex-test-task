import React, { useEffect, useState } from "react"
import { Form } from "react-bootstrap"
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"

function AddEditTask({
  fetchTasks,
  setShowTaskModal,
  showTaskModal,
  project,
  setProject,
  task,
  fetchTask,
}) {



  const handleClose = () => setShowTaskModal(false)
  const handleShow = () => setShowTaskModal(true)

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [url, setUrl] = useState("")
  const [method, setMethod] = useState("POST")

  const status = ['waiting', 'implementation', 'verifying', 'releasing']

  const [updatedTask, setUpdatedTask] = useState({
    task: "",
    description: "",
    status:"waiting"
  })

  useEffect(() => {
    if (task) {
      setUrl(`http://localhost:3001/tasks/${task?._id}`)
      setMethod("PUT")
      setUpdatedTask({
        task: task.task,
        description: task.description,
        developers: task.developers,
        status: task.status,
      })
    } else {
      setUrl(`http://localhost:3001/projects/${project?._id}/tasks`)
      setMethod("POST")
    }
  }, [])

  const handleSave = async (e) => {
    try {
      const response = await fetch(url, {
        method,
        body: JSON.stringify(updatedTask),
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
          fetchTask(task._id)
        } else {
          console.log("without task", data)
          fetchTasks(data.project._id)
          setUpdatedTask({
            task: "",
            description: "",
            status:""
          })
        }
        setIsLoading(false)
        setShowTaskModal(false)
        handleClose()
      }
    } catch (error) {
      console.log(error)
      setError("Could not fetch developers")
      setIsLoading(false)
    }
  }

  return (
    <Modal show={showTaskModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{task ? "Edit task" : "Add Task"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <p>{project && `Task under project - ${project?.title}`}</p>
          <Form.Group>
            <Form.Label className="w-100">
              task
              <Form.Control
                type="text"
                name="task"
                id="task"
                value={updatedTask.task}
                onChange={(e) =>
                  setUpdatedTask({
                    ...updatedTask,
                    task: e.target.value,
                  })
                }
              />
            </Form.Label>
          </Form.Group>
          <Form.Group>
            <Form.Label className="w-100">
              Description
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                id="description"
                value={updatedTask.description}
                onChange={(e) =>
                  setUpdatedTask({
                    ...updatedTask,
                    description: e.target.value,
                  })
                }
              />
            </Form.Label>
          </Form.Group>
          <Form.Label>Status of the task</Form.Label>
            {status.map((st, k) => 
            <Form.Group key={k}>
            <Form.Label  className=" d-flex justify-content-start align-items-center">
              <Form.Check 
              className="mx-2"
              key={k}
              type="radio"
              name="role"
              // id={st}
              value={st}
              checked={updatedTask.status === st} 
              onChange={(e) => setUpdatedTask({
                ...updatedTask,
                status: e.target.value,
              })}
              />
              {st}
              </Form.Label>
            </Form.Group>
              )}
          
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          className="no-box-shadow"
          variant="secondary"
          onClick={handleClose}
        >
          Close
        </Button>
        <Button variant="primary" onClick={() => handleSave()}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default AddEditTask
