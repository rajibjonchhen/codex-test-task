import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom';
import Loader from '../Loader';
import EditModal from './EditModal';

function Detail() {
  
    const [project, setProject] = useState(null)
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const [showEditModal, setShowEditModal] = useState(false);
    const params = useParams()
    useEffect(() => {
        fetchProject(params.projectId);
    }, [])

    const fetchProject = async (projectId) => {
        const baseUrl = "http://localhost:3001"
        try {
          const response = await fetch(
            `${baseUrl}/projects/${projectId}`,
            {
              method: "GET",
              headers: {
                "authorization": localStorage.getItem("MyToken"),
              },
            }
          );
          if (response.status !== 200) {
            const data = await response.json();
            console.log(data);
            setError("Error in fetching projects");
            setIsLoading(false);
          } else {
            const data = await response.json();
            setProject(data.project);
            console.log(data.project);
            setIsLoading(false);
          }
        } catch (error) {
          console.log(error);
          setIsLoading(false);
          setError("Could not fetch projects");
        }
      }
  
    return (  
    <div>
        {isLoading ? (<Loader/>) : error ? (<div>{error}</div>) : project &&
        <Container>
            <Row>
                <Col>
                    <Button onClick={() => setShowEditModal(true)}>Edit Project</Button>
                </Col>
            </Row>
            <Row>
                <Col sm={12} md={6} style={{ margin: "auto" }}>
                    {project.title}
                </Col>
                <Col sm={12} md={6} style={{ margin: "auto" }}> 
                {project.description}   
                </Col>
            </Row>
            <EditModal fetchProject={fetchProject} setShowEditModal={setShowEditModal} showEditModal={showEditModal} project={project}/>
            
        </Container>
        
}
    </div>
  )
}

export default Detail