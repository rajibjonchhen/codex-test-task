import { useEffect, useState } from 'react';
import { Alert, Button, Col, Container, Form, Row } from 'react-bootstrap';
// import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {MdOutlineVisibility, MdOutlineVisibilityOff} from 'react-icons/md'

function Copyright(props) {
  return (
    <p variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link to="/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </p>
  );
}



const Registration = ({setShowSignIn})  => {
  
//   const dispatch = useDispatch()
  const navigate = useNavigate()
//   const role = useSelector(state => state.user.role)

  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(true)
  const [isSubmit, setIsSubmit] = useState(false)
  const [signUpErr, setSignUpErr] = useState({})
  
  
    const [signUpUser, setSignUpUser] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    repassword: "",
    role:""
  });

  useEffect(() => {
    window.scrollTo(0, 0)
   
  }, [])

  useEffect(() => {
    if(Object.keys(signUpErr).length === 0 && isSubmit){
        console.log("I am going to submit")
        registerUser()
    }
  },[signUpErr])

  const handleChange = (e) => {
    console.log("signUpUser", signUpUser)
    const { name, value } = e.target;
    setSignUpUser({ ...signUpUser, [name]: value });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault()
    setSignUpErr(validateForm(signUpUser))
    setIsSubmit(true)
}

const validateForm = (signUpUser) => {
    const regex = /\S+@\S+\.\S+/
    const errors = {} 
    if(!signUpUser.email){
        errors.email = "email is missing"
    }else{
        if(!regex.test(signUpUser.email)){
            errors.email = "Email is not valid"
        }
    }
    
    if(!signUpUser.password){
        errors.password = "password is missing"
    }
    
    if(!signUpUser.repassword){
        errors.repassword = "repassword is missing"
    }else if(signUpUser.repassword !== signUpUser.password){
        errors.repassword = "password and repassword doesnot match"
      }
    

    if(!signUpUser.name){

        errors.name =  "name is missing"
    }
    if(!signUpUser.surname ){
        errors.surname = "surname is missing"
    }
    if(!signUpUser.role ){
        errors.role = "role is missing"
    }
    
    return errors
}

const registerUser = async() => {
try {
    console.log(process.env.REACT_APP_PROD_BE_URL)
    console.log(signUpUser)
    const response = await fetch(`${process.env.REACT_APP_PROD_BE_URL}/users/signUp`,{
        method:"POST",
        body : JSON.stringify(signUpUser),
        headers:{
            "content-type" :"application/json"
        }
    })
    if(response.status !== 200){
        const data = await response.json()
        console.log(data)
        setError(data.error)
    } else{
        const data = await response.json()
        console.log(data)
        localStorage.setItem("MyToken", data.token);
        // dispatch(setMyInfoAction(data.user))
        navigate("/home")
    }
} catch (error) {
    console.log(error)
}
}

  return (
    
      <Container className='theme-light-bg mt-3 py-3 text-light'>

        <Row
        >
           
          
          <Col sm={12} md={6} style={{margin:"auto", }}>
          <Form onSubmit={handleSubmit} noValidate style={{textAlign:"left", width: '100%', padding:'30px 15px', border:'1px solid rgb(200,200,200)'  }}>
          <p className="h1 text-center" >
            Sign Up
          </p>
         
          {error.length > 0 && <Alert  severity="error">{error}</Alert>}
          {/* name field */}
          <Form.Group className="mb-3" 
          onChange={(e) => handleChange(e)} 
          value={signUpUser.name} 
          placeholder="First Name"
          name="name"
          id="name"
        required
          >
            <Form.Label>First Name</Form.Label>
            <Form.Control type="text" placeholder="Enter first name" />
            <Form.Text className="text-danger" align='left'>{!signUpUser.name && signUpErr.name} </Form.Text>
        </Form.Group>

          {/* surname field */}
          <Form.Group className="mb-3" 
          onChange={(e) => handleChange(e)} 
          value={signUpUser.surname} 
          placeholder="Surname"
          name="surname"
          id="surname"
        required
          >
            <Form.Label> Surname</Form.Label>
            <Form.Control type="text" placeholder="Enter surname" />
            <Form.Text className="text-danger" align='left'>{!signUpUser.surname && signUpErr.surname} </Form.Text>
        </Form.Group>
           
          {/* email field */}
          <Form.Group className="mb-3" 
          controlId="formBasicEmail" 
          onChange={(e) => handleChange(e)} 
          value={signUpUser.email} 
          placeholder="Email Address"
          name="email"
          id="email"
        required
          >
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
            <Form.Text className="text-danger" align='left'>{!signUpUser.email && signUpErr.email || signUpUser.email && signUpErr.email} </Form.Text>
        </Form.Group>
            
          {/* password field */}
          <Form.Group 
          className="mb-3" 
          controlId="formBasicPassword"
          style={{position:'relative'}}
          >
        <Form.Label>Password</Form.Label>
        <Form.Control 
        placeholder="Password" 
         name="password"
         label="Password"
         value={signUpUser.password}
         onChange={(e) => handleChange(e)}
         type= {showPassword? "text":"password"}
         id="password"
         required
        
        />
        <span style={{color:"black",position:'absolute', right:"10px", top:"45px",bottom:"0"}}>
            <MdOutlineVisibility style={{display:!showPassword? "block":"none"}} onClick={() => setShowPassword(true)}/>
            <MdOutlineVisibilityOff style={{display:showPassword? "block":"none"}} onClick={() => setShowPassword(false)}/>
        </span>
            <Form.Text className="text-danger"  align='left'>{!signUpUser.password && signUpErr.password}</Form.Text>
      </Form.Group>
    
          {/* password field */}
      <Form.Group  className="mb-3"  style={{position:'relative'}}>
        <Form.Label>Repassword</Form.Label>
            
            <Form.Control
           placeholder="Repassword" 
           name="repassword"
           label="Repassword"
           value={signUpUser.repassword}
           onChange={(e) => handleChange(e)}
           type= {showPassword? "text":"password"}
           id="repassword"
           required
           />
        <span style={{color:"black",position:'absolute', right:"10px", top:"45px",bottom:"0"}}>
            <MdOutlineVisibility style={{display:!showPassword? "block":"none"}} onClick={() => setShowPassword(true)}/>
            <MdOutlineVisibilityOff style={{display:showPassword? "block":"none"}} onClick={() => setShowPassword(false)}/>
        </span>
            <Form.Text className="text-danger"  align='left'>{!signUpUser.repassword  &&  signUpErr?.repassword || signUpUser.repassword !== signUpUser.password &&  signUpErr?.repassword }</Form.Text>
          
           </Form.Group>
            
          {/* role field */}
            <Form.Group  className="mb-3" >

                <Form.Label id="demo-simple-select-label">Role  </Form.Label>
                  {["manager","developer"].map((category, i) => (<>
                <Form.Label className=" d-flex justify-content-start align-items-center" id="demo-simple-select-label"> <Form.Check className="mx-2" key={i} type="radio" name="role" id={category}/> {category}</Form.Label>
                   
                  </>
                  ))}
                    <Form.Text className="text-danger" align='left'>{!signUpUser.role  &&    signUpErr?.role }</Form.Text>
                  </Form.Group>


            <div className="m-auto text-center">
                <button
                    
                    type="submit"
                    variant="contained"
                    
                    onClick={(e) => handleSubmit(e)}
                    >
                        Register
                    </button>
                        <p  onClick={() => setShowSignIn(true)} variant="body2">
                        Already a member? <span className="text-blue">Sign In</span>
                        </p>
            </div>
    
        
        </Form>
        </Col>
        </Row>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    
  );
}


export default Registration