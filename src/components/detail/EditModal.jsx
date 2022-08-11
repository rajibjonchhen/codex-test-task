import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

function EditModal({fetchProject, setShowEditModal, showEditModal, project}) {
  const handleClose = () => setShowEditModal(false)
  const handleShow = () => setShowEditModal(true)

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

const [updatedProject, setUpdatedProject] = useState({
    title:"",
    description:"",
    developers:[]
})
  useEffect(() => {
      console.log(project)
    setUpdatedProject({
        title: project.title,
        description: project.description,
        developers: project.developers
    })
  },[])


  const handleSave = async(e) => {
    e.preventDefault()
try {
    const baseUrl = "http://localhost:3001"
    const response = fetch(`${baseUrl}/projects/${project._id}`, {
        method: "PUT",
        body: JSON.stringify(updatedProject),
        headers: {
            "authorization": localStorage.getItem("MyToken"),
            "Content-Type": "application/json"
        },
    })
    if(response.status !== 200) {
        const data = await response.json()
        console.log(data)
        setError("Error in saving the changes")
        setIsLoading(false)
    } else{
        const data = await response.json()
        console.log(data)
        setIsLoading(false)
        setShowEditModal(false)
        fetchProject()
    }

} catch (error) {
    
}
}

  return (
      <Modal show={showEditModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                {/* <Form.Group className="w-100">
                    <Form.Label>
                        Title
                <Form.Control  type="text" name="title" id="title" value={updatedProject.title} onChange={() => setUpdatedProject({...updatedProject,title:e.target.value})}/>
                    </Form.Label>
                </Form.Group>
                <Form.Group>
                <Form.Label>
                    Description
                    <Form.Control as="textarea" rows={3} name="description" id="description" value={updatedProject.description}/>
                </Form.Label>
                </Form.Group> */}
            </Form>
            {project.developers}
                    <div>
                        {project?.developers?.map((developer) => 
                        <div key={developer?._id}>{developer.name} </div>
                        )
                        }
                    </div>
        </Modal.Body>
        <Modal.Footer>
          <Button className="no-box-shadow" variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleSave()}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
  )
}

export default EditModal