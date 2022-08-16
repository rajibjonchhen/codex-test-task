import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";

function AddEditComment({
  setShowCommentModal,
  showCommentModal,
  fetchComments,
  task,
  singleComment,
  setSingleComment
}) {
  const handleClose = () => setShowCommentModal(false);
  const handleShow = () => setShowCommentModal(true);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [url, setUrl] = useState("");
  const [method, setMethod] = useState("");
  const navigate = useNavigate()

  const [updatedComment, setUpdatedComment] = useState({
    comment: "",
  });

  useEffect(() => {
    
    if (singleComment) {
      setUrl(`http://localhost:3001/comments/${singleComment?._id}`);
      setMethod("PUT");
      setUpdatedComment({
        comment: singleComment.comment,

      });
    } else {
      setUrl(`http://localhost:3001/tasks/${task?._id}/comments`);
      setMethod("POST");
    }
  }, []);

  const handleSave = async (e) => {
    try {
      const response = await fetch(url, {
        method,
        body: JSON.stringify(updatedComment),
        headers: {
          authorization: localStorage.getItem("MyToken"),
          "Content-Type": "application/json",
        },
      })
      if (response.status !== 201 && response.status !== 200) {
        const data = await response.json();
        setError("Error in saving the changes");
        setIsLoading(false);
      } else {
        const data = await response.json();
        if (singleComment) {
          console.log("with task",data)
          setSingleComment(data.comment)
        } else {
          fetchComments(task?._id);
          console.log("without task",data)
          // setTask(data.task);
        } 
        setIsLoading(false);
        setShowCommentModal(false);
        handleClose();
      }
    } catch (error) {}
  }

 

  return (
    <Modal show={showCommentModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{task? "Edit Comment":"Add Comment"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form >
          <Form.Group  >
            <p>Comment on Task - {task.task}</p>
            <Form.Label className="w-100">
              Comment
              <Form.Control
                type="text"
                name="comment"
                id="comment"
                value={updatedComment?.comment}
                onChange={(e) =>
                  setUpdatedComment({
                    ...updatedComment,
                    comment: e.target.value,
                  })
                }
              />
            </Form.Label>
          </Form.Group>
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
  );
}

export default AddEditComment;
