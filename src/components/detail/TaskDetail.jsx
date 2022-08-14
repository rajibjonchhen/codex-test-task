import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../Loader';
import AddEditComment from './AddEditComment';
import AddEditTask from './AddEditTask';

const Task = () => {

const [task, setTask] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);

  const params = useParams();

  useEffect(() => {
    fetchTask(params.taskId);
  }, []);

  const fetchTask = async (taskId) => {
    const baseUrl = "http://localhost:3001";
    try {
      const response = await fetch(`${baseUrl}/tasks/${taskId}`, {
        method: "GET",
        headers: {
          authorization: localStorage.getItem("MyToken"),
        },
      });
      if (response.status !== 200) {
        const data = await response.json();
        setError("Error in fetching tasks");
        setIsLoading(false);
      } else {
        const data = await response.json();
        setTask(data.task);
        console.log(data.task);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setError("Could not fetch tasks");
    }
  };

  return (
    <div>
        {isLoading ? (<Loader/>) : error ? (<div>{error}</div>) 
        : (task &&
                <Container>
                    <p className='h2 p-3'>Task - {task?.task}</p>
                    <Row style={{ minHeight: "50vh" }}>
                        <Col sm={12} md={6} style={{ margin: "auto" }}>
                            <div className='bg-dark border-light mt-3'>
                                <p>{task?.description}</p>
                                <p>{task?.userId}</p>
                                {task?.comments.map((comment, i) => (
                                    <p key={i} className="bg-dark"> {comment.comment}</p>
                                ))}
                                <Button className="m-3"  onClick={() => setShowTaskModal(true)}>Edit Task</Button>
                                <Button className="m-3"  onClick={() => setShowCommentModal(true)}>Add Comment</Button>
                            </div>
                            <AddEditTask fetchTask={fetchTask} task={task} setTask={setTask} setShowTaskModal={setShowTaskModal} showTaskModal={showTaskModal}/>
                            <AddEditComment fetchTask={fetchTask} task={task} setTask={setTask} setShowCommentModal={setShowCommentModal} showCommentModal={showCommentModal}/>
                        </Col>
                    </Row>
                </Container>
        )}
                </div>
  )
}

export default Task