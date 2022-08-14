import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../Loader";
import AddEditProject from "./AddEditProject";
import AddEditTask from "./AddEditTask";

function ProjectDetail() {
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const navigate = useNavigate();

  const params = useParams();
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
          <Container>
            <p className="h1 mt-5">{project.title}</p>
            <Row style={{ minHeight: "50vh" }}>
              <Col sm={12} md={6} style={{ margin: "auto" }}>
                <div className="bg-dark border-light m-5">
                  <img src={project?.image || "https://via.placeholder.com/300/50"} alt="project"  width="100%"/>
                </div>
              </Col>
              <Col sm={12} md={6} style={{ margin: "auto" }}>
                <div className="bg-dark border-light">
                  <p className="h3">Description</p>
                  <p>{project.description}</p>
                  <p className="h3">All tasks</p>
                  {tasks?.map((task, i) => (
                    <p key={i} className="pointer"  onClick={() => navigate(`/task/${task._id}`)}> {task.task}</p>
                  ))}
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
          </Container>
        )
      )}
    </div>
  );
}

export default ProjectDetail;
