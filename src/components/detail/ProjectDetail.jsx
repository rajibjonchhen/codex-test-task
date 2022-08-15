import React, { useEffect, useState } from "react";
import { Badge, Button, Col, Container, Form, ListGroup, ListGroupItem, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import SelectDeveloper from "../../getDevelopers/SelectDeveloper";
import Loader from "../Loader";
import AddEditProject from "./AddEditProject";
import AddEditTask from "./AddEditTask";
import SelectDeveloperModal from "./SelectDeveloperModal";

function ProjectDetail() {
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showDeveloperModal, setShowDeveloperModal] = useState(false);
  const navigate = useNavigate();
  const params = useParams();

  const [selected, setSelected] = useState({});
const [developers, setDevelopers] = useState([]);

useEffect(() => {
  fetchDevelopers()
}, [])

  useEffect(() => {
    fetchProject(params.projectId);
    fetchTasks(params.projectId);
  }, []);

  const fetchProject = async (projectId) => {
    const baseUrl = "http://localhost:3001";
    try {
      const response = await fetch(`${baseUrl}/projects/${projectId}`, {
        method: "GET",
        headers: {
          authorization: localStorage.getItem("MyToken"),
        },
      });
      if (response.status !== 200) {
        const data = await response.json();
        setError("Error in fetching projects");
        setIsLoading(false);
      } else {
        const data = await response.json();
        setProject(data.project);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setError("Could not fetch projects");
    }
  };


  const fetchDevelopers = async () => {
    const baseUrl = "http://localhost:3001"
    try {
      const response = await fetch(baseUrl + "/users/developers", {
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
  

  const fetchTasks = async (projectId) => {
    const baseUrl = "http://localhost:3001";
    try {
      const response = await fetch(`${baseUrl}/projects/${projectId}/tasks`, {
        method: "GET",
        headers: {
          authorization: localStorage.getItem("MyToken"),
        },
      });
      if (response.status !== 200) {
        const data = await response.json();
        setError("Error in fetching projects");
        setIsLoading(false);
      } else {
        const data = await response.json();
        setTasks(data.tasks);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setError("Could not fetch projects");
    }
  };

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <div>{error}</div>
      ) : (
        project && (
          <Container className="text-start">
            <p className="h1 mt-5">{project.title}</p>
            <Row className="border" style={{ minHeight: "50vh" }}>
              <Col sm={12} md={6} style={{ margin: "0 auto" }}>
                <div className="bg-dark p-3">
                  <img src={project?.image || "https://via.placeholder.com/300/50"} alt="project"  width="100%"/>
                  <p className="h3">Description</p>
                  <p>{project.description}</p>
                  <p className="">Developers <br/>{ project.developers.length<1? "not assigned":project?.developers?.map((developer) => 
                  <Badge key={developer._id} bg="secondary m-1">{developer.name } {developer.surname }</Badge>
                  )} </p>
                  
                  <div className="d-flex">
                  
                  <Button className="mx-2" onClick={() => setShowDeveloperModal(true)}>Assign Developer</Button>
                    </div>
                </div>
              </Col>
              <Col sm={12} md={6} style={{ margin: "0 auto" }}>
                <div className="bg-dark  text-start p-3 ">
                  <p className="h3">All tasks</p>
                  <ListGroup>

                  {tasks?.map((task, j) => (
                    <ListGroup.Item key={j} className="pointer" variant="light" onClick={() => navigate(`/task/${task._id}`)}> 
                    <span>{task.task}</span>
                    {task.developers.map((developer) => <Badge key={developer._id} bg="secondary">{developer.name}{developer.surname}</Badge>)}
                    </ListGroup.Item>
                    ))}
                    </ListGroup>
                </div>
                <Button className="m-3" onClick={() => setShowTaskModal(true)}>Add task</Button>
              </Col>
            </Row>
            <Row>
              <Col>
                <Button className="m-3"  onClick={() => setShowProjectModal(true)}>
                  Edit Project
                </Button>
              </Col>
            </Row>
            <AddEditProject
              setShowProjectModal={setShowProjectModal}
              showProjectModal={showProjectModal}
              setProject={setProject}
              project={project}
            />
            <AddEditTask
              setShowTaskModal={setShowTaskModal}
              showTaskModal={showTaskModal}
              setProject={setProject}
              project={project}
              fetchTasks={fetchTasks}
            />

            <SelectDeveloperModal showDeveloperModal={showDeveloperModal} setShowDeveloperModal={setShowDeveloperModal} project={project} setProject={setProject}/>
          </Container>
        )
      )}
    </div>
  );
}

export default ProjectDetail;
