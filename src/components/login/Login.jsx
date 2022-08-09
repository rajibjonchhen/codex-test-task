import React from 'react'
import { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Copyright from './CopyRight'
import Registration from './registration/Registration'
import SignIn from './signIn/SignIn'

function Login() {
    const [loginPage, setLoginPage] = useState("signIn")
  return (
    <Container className="theme-light-bg py-3 text-light" style={{minHeight:"100vh"}}>
    <Row>
      <Col sm={12} md={6} style={{ margin: "auto" }}>
      <Registration loginPage={loginPage} setLoginPage={setLoginPage} />
        <SignIn loginPage={loginPage} setLoginPage={setLoginPage} />
        <Copyright/>
      </Col>
    </Row>
  </Container>
        
    
  )
}

export default Login