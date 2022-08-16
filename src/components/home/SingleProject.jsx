import React from 'react'
import { Badge, Button, Card, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

function SingleProject({project}) {
  const navigate= useNavigate()
  return (
    <Col xs={12} sm={12} md={6} lg={4} xl={3}>
        <Card className="bg-dark border-light mt-3" style={{minHeight:"250px"}}>
      {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
      <Card.Body >
        <Card.Title id="text-wrap-2">{project?.title}</Card.Title>
        <Card.Text id="text-wrap-3" style={{height:"100px"}}>
          {project?.description}
          
        </Card.Text>
        <p>Developers <br/>
            { project?.developers.length<1? "not assigned":project?.developers?.slice(0,3).map((developer) => <Badge bg="secondary m-1" key={developer._id}>{developer.name } {developer.surname }</Badge>)}
          </p>
        <Button variant="primary" onClick={() => {navigate(`/project/${project._id}`)}}>See detail</Button>
      </Card.Body>
    </Card>
    </Col>
  )
}

export default SingleProject