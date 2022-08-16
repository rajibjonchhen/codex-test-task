import React, { useEffect, useState } from 'react'
import { Badge, Button, Col, Container, Row } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import Loader from '../Loader'
import AddEditComment from './AddEditComment'
import AddEditTask from './AddEditTask'
import SelectDeveloperModal from './SelectDeveloperModal'
import SingleComment from './SingleComment'

const Task = () => {

const [task, setTask] = useState(null)
const [comments, setComments] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [showCommentModal, setShowCommentModal] = useState(false)
  const [showTaskModal, setShowTaskModal] = useState(false)
  const [showDeveloperModal, setShowDeveloperModal] = useState(false);


  const params = useParams()

  useEffect(() => {
    fetchTask(params.taskId)
    fetchComments(params.taskId)
  }, [])

  const fetchTask = async (taskId) => {
    const baseUrl = "http://localhost:3001"
    try {
      const response = await fetch(`${baseUrl}/tasks/${taskId}`, {
        method: "GET",
        headers: {
          authorization: localStorage.getItem("MyToken"),
        },
      })
      if (response.status !== 200) {
        const data = await response.json()
        setError("Error in fetching tasks")
        setIsLoading(false)
      } else {
        const data = await response.json()
        setTask(data.task)
        setIsLoading(false)
      }
    } catch (error) {
      console.log(error)
      setIsLoading(false)
      setError("Could not fetch tasks")
    }
  }

  const fetchComments = async (taskId) => {
    const baseUrl = "http://localhost:3001"
    try {
      const response = await fetch(`${baseUrl}/tasks/${taskId}/comments`, {
        method: "GET",
        headers: {
          authorization: localStorage.getItem("MyToken"),
        },
      })
      if (response.status !== 201) {
        const data = await response.json()
        setError("Error in fetching comments")
        setIsLoading(false)
        console.log("response data" , data)

      } else {
        const data = await response.json()
        console.log(data)
        console.log("response data" , data)
        setComments(data.comments)
        setIsLoading(false)
      }
    } catch (error) {
      console.log(error)
      setIsLoading(false)
      setError("Could not fetch tasks")
    }
  }

  return (
    <div>
        {isLoading ? (<Loader/>) : error ? (<div>{error}</div>) 
        : (task &&
                <Container>
                    <Row style={{ minHeight: "50vh" }}>
                        <Col sm={12} md={6} style={{ margin: "auto" }}>
                            <div className='bg-dark border rounded mt-3 p-3'>
                              <p className='h2 p-3'>Task - {task?.task}</p>
                                <p className="h4">Description</p>
                                <p>{task?.description}</p>
                                <p className="h4">
                                 Status </p>
                                <p>{task?.status}</p>
                                <p className="h4">Developer/s </p>
                                 {task?.developers.length<1? 
                                <p>not assigned</p> 
                                : task?.developers.map((developer) => 
                                <Badge bg="secondary">{developer.name}</Badge>)}
                    </div>
                                <p className="bg-dark text-start mt-3">All comments</p>
                                {comments?.map((comment, i) => (
                                   <SingleComment key={i} comment={comment} task={task} fetchTask={fetchTask}/>
                                ))}
                                <div className="d-flex">
                  
                                <Button className="m-3" onClick={() => setShowDeveloperModal(true)}>Assign Developer</Button>
                                <Button className="m-3"  onClick={() => setShowTaskModal(true)}>Edit Task</Button>
                                <Button className="m-3"  onClick={() => setShowCommentModal(true)}>Add Comment</Button>
                            </div>
                            {/* modals */}
                            <AddEditTask  fetchTask={fetchTask} task={task} setTask={setTask} setShowTaskModal={setShowTaskModal} showTaskModal={showTaskModal}/>
                            <AddEditComment fetchComments={fetchComments} task={task} setTask={setTask} setShowCommentModal={setShowCommentModal} showCommentModal={showCommentModal}/>
                            <SelectDeveloperModal showDeveloperModal={showDeveloperModal} setShowDeveloperModal={setShowDeveloperModal} task={task} setTask={setTask}/>
                            
                        </Col>
                    </Row>
                </Container>  
        )}
                </div>
  )
}

export default Task