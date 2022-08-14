import React from 'react'
import { Button, Card, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

function SingleProject({project}) {
  const navigate= useNavigate()
  return (
    <Col xs={12} sm={6} md={4} lg={3}>
        <Card className="bg-dark border-light mt-3" style={{minHeight:"250px"}}>
      {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
      <Card.Body >
        <Card.Title id="text-wrap-2">{project.title}</Card.Title>
        <Card.Text id="text-wrap-3" style={{height:"100px"}}>
          {project.description}
          Developers <br/>
            { project.developers.length<1? "not assigned":project?.developers?.map((developer) => <span>{developer.name },</span>)}
          
        </Card.Text>
        <Button variant="primary" onClick={() => {navigate(`/project/${project._id}`)}}>See detail</Button>
      </Card.Body>
    </Card>
    </Col>
  )
}

export default SingleProject