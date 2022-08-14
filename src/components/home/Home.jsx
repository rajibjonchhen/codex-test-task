import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import AddEditProject from "../detail/AddEditProject";
import Loader from "../Loader";
import SingleProject from "./SingleProject";

function Home({user}) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [projects, setProjects] = useState([]);
  const [showProjectModal, setShowProjectModal] = useState(false);

  useEffect(() => {
    console.log(user);
    if(user?.role === "manager"){
      fetchProjects("/projects")
    }else{
      fetchProjects("/projects/my")
    }
  }, [user]);

  const fetchProjects = async (myPath) => {
    const baseUrl = "http://localhost:3001"
    try {
      const response = await fetch(
        `${baseUrl}${myPath}`,
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
        setProjects(data.projects);
        console.log(data.projects.reverse());
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setError("Could not fetch projects");
    }
  };

  const handleCreateProject = async () => {
    const baseUrl = "http://localhost:3001"
    try {
      const response = await fetch(
        `${baseUrl}/projects`,
        {
          method: "Post",
          body: JSON.stringify(),
          headers: {
            "content-type": "application/json",
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
        setProjects(data.projects);
        console.log(data.projects.reverse());
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
      <Container className="">
        <Row>
          <Col>
          <h1>{user?.role === "manager"? "All Projects":"My Projects"}</h1>
          <Button onClick={() => setShowProjectModal(true)} style={{display:user?.role!=="manager"?"none":"block"}}>Create new project</Button>
          </Col>
        </Row>
        <Row>
          {
        isLoading ? (
        <Loader />
         ) : 
        error ? (
            <div>{error}</div>
           ) : (projects.length<1? <p className="p-3 h3"> There are no projects</p>:
            projects?.map((project) => (
              <SingleProject key={project._id} project={project} />
            )
            )
            )
          }
        </Row>
          <AddEditProject fetchProjects={fetchProjects} setShowProjectModal={setShowProjectModal} showProjectModal={showProjectModal} />

      </Container>
    </div>
  );
}

export default Home;
