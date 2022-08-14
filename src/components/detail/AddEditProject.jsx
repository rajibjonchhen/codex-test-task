import React, { useEffect, useState } from "react"
import { Form } from "react-bootstrap"
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"

function AddEditProject({
  fetchProjects,
  setShowProjectModal,
  showProjectModal,
  project,
  setProject,
}) {
  const handleClose = () => setShowProjectModal(false)
  const handleShow = () => setShowProjectModal(true)

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [url, setUrl] = useState("http://localhost:3001/projects/")
  const [method, setMethod] = useState("POST")

  const [updatedProject, setUpdatedProject] = useState({
    title: "",
    description: "",
    developers: [],
  })

  useEffect(() => {
    if (project) {
      setUrl(url+project._id)
      setMethod("PUT")
      setUpdatedProject({
        title: project.title,
        description: project.description,
        developers: project.developers,
      })
    }
  }, [])


  const handleSave = async (e) => {
    try {
      const response = await fetch(url, {
        method,
        body: JSON.stringify(updatedProject),
        headers: {
          authorization: localStorage.getItem("MyToken"),
          "Content-Type": "application/json",
        },
      })
      if (response.status !== 200) {
        const data = await response.json()
        console.log(data)
        setError("Error in saving the changes")
        setIsLoading(false)
      } else {
        const data = await response.json()
        if (project) {
          setProject(data.project)
        } else {
          fetchProjects()
          setUpdatedProject({
            title: "",
            description: "",
          })
        }
        setIsLoading(false)
        setShowProjectModal(false)
        handleClose()
      }
    } catch (error) {}
  }

  return (
    <Modal show={showProjectModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{project? "Edit Project":"Add Project"} </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form >
          <Form.Group  >
            <p>{project && `Project ${project?.title}`}</p>
            <Form.Label className="w-100">
              Title
              <Form.Control
                type="text"
                name="title"
                id="title"
                value={updatedProject.title}
                onChange={(e) =>
                  setUpdatedProject({
                    ...updatedProject,
                    title: e.target.value,
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
                value={updatedProject.description}
                onChange={(e) =>
                  setUpdatedProject({
                    ...updatedProject,
                    description: e.target.value,
                  })
                }
              />
            </Form.Label>
          </Form.Group>
          <div>
            {project?.developers?.map((developer) => (
              <div key={developer?._id}>{developer.name} </div>
            ))}
          </div>
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

export default AddEditProject
