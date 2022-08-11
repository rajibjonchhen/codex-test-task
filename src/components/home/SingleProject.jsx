import React from 'react'
import { Button, Card, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

function SingleProject({project}) {
  const navigate= useNavigate()
  return (
    <Col xs={12} sm={6} md={4} lg={3}>
        <Card className="bg-dark border-light mt-3" >
      {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
      <Card.Body>
        <Card.Title >{project.title}</Card.Title>
        <Card.Text>
          {project.description}
        </Card.Text>
        <Button variant="primary" onClick={() => {navigate(`/detail/${project._id}`)}}>See detail</Button>
      </Card.Body>
    </Card>
    </Col>
  )
}

export default SingleProject