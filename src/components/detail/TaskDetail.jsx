import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import Loader from '../Loader'
import AddEditComment from './AddEditComment'
import AddEditTask from './AddEditTask'

const Task = () => {

const [task, setTask] = useState(null)
const [comments, setComments] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [showCommentModal, setShowCommentModal] = useState(false)
  const [showTaskModal, setShowTaskModal] = useState(false)

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
                    <p className='h2 p-3'>Task - {task?.task}</p>
                    <Row style={{ minHeight: "50vh" }}>
                        <Col sm={12} md={6} style={{ margin: "auto" }}>
                            <div className='bg-dark border-light mt-3'>
                                <p>{task?.description}</p>
                                <p>{task?.userId}</p>
                                <p className="bg-dark text-start">All comments</p>
                                {comments?.map((comment, i) => (
                                    <p key={i} className="bg-warning text-start p-2"> {comment.comment}</p>
                                ))}
                                <Button className="m-3"  onClick={() => setShowTaskModal(true)}>Edit Task</Button>
                                <Button className="m-3"  onClick={() => setShowCommentModal(true)}>Add Comment</Button>
                            </div>
                            <AddEditTask  fetchTask={fetchTask} task={task} setTask={setTask} setShowTaskModal={setShowTaskModal} showTaskModal={showTaskModal}/>
                            <AddEditComment fetchComments={fetchComments} task={task} setTask={setTask} setShowCommentModal={setShowCommentModal} showCommentModal={showCommentModal}/>
                        </Col>
                    </Row>
                </Container>  
        )}
                </div>
  )
}

export default Task