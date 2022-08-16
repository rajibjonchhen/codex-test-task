import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import AddEditComment from './AddEditComment'
import {BsFillTrashFill} from 'react-icons/bs'


function SingleComment({comment, task, fetchComments}) {
  const [showCommentModal, setShowCommentModal] = useState(false)
    const [singleComment, setSingleComment] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")

    useEffect(() => {
        if (comment) {
            setSingleComment(comment)
        }
    }, [comment])

  const fetchComment = async (commentId) => {
      try {
          const response = await fetch(`http://localhost:3001/comments/${commentId}`, {
                method: "GET",
                headers: {
                    authorization: localStorage.getItem("MyToken"),
                },
            })
            if (response.status !== 200) {
                const data = await response.json()
                setError("Error in fetching comments")
                setIsLoading(false)
            }
            else {
                const data = await response.json()
                setSingleComment(data.comment)
                setIsLoading(false)
            }
      } catch (error) {
          
      }
  }

  const handleDelete = async (e) => {
      const baseUrl = "http://localhost:3001"
    try {
      const response = await fetch(`${baseUrl}/comments/${singleComment._id}`, {
        method: "DELETE",
        headers: {
          authorization: localStorage.getItem("MyToken"),
          "Content-Type": "application/json",
        },
      })
      if (response.status > 204 && response.status !== 200) {
        const data = await response.json();
        setError("Error in saving the changes");
        setIsLoading(false);
      } else {
        const data = await response.json()
        setIsLoading(false);
        setShowCommentModal(false);
        fetchComments(task?._id);
      }
    } catch (error) {}
  }

  return (
    <Container className="bg-secondary rounded text-start p-2 m-1 ">
        <Row>
            <Col sm = {9}>
         <p  > {singleComment?.comment}

        <br/> By - <span>{singleComment?.commentedBy.name + " " +singleComment?.commentedBy.surname|| ""}</span>
        </p>
            </Col>
            <Col sm={3} className="d-flex align-items-center">
                <Button onClick={() => setShowCommentModal(true)}>Edit</Button>
                <Button variant="danger" onClick={() => handleDelete()}>
          <BsFillTrashFill />
        </Button>
            </Col>
        </Row>
      {comment &&  <AddEditComment 
        showCommentModal={showCommentModal}  
        setShowCommentModal={setShowCommentModal}  
        fetchComments={fetchComments} 
        task={task}
        setSingleComment={setSingleComment}
        singleComment={singleComment}
        />}
          
    </Container>
  )
}

export default SingleComment