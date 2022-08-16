import { useEffect, useState } from "react";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
// import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";


const SignIn = ({ loginPage, setLoginPage }) => {
  //   const dispatch = useDispatch()
  const navigate = useNavigate();
  //   const role = useSelector(state => state.user.role)

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const [isSubmit, setIsSubmit] = useState(false);
  const [signInErr, setSignInErr] = useState({});
  const [checkUserInput, setCheckUserInput] = useState(false);
const [user, setUser] = useState(null)
  const [signInUser, setSignInUser] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // useEffect(() => {
  //   if (Object.keys(signInErr).length === 0 && isSubmit) {
  //     console.log("I am going to submit");
  //     registerUser();
  //   }
  // }, [signInErr]);

  useEffect(()=> {
    if(checkUserInput === true){
      setSignInErr(validateForm(signInUser))
    }
  },[signInUser])
  

  const handleChange = (e) => {
    console.log("signInUser", signInUser);
    const { name, value } = e.target;
    setSignInUser({ ...signInUser, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSignInErr(validateForm(signInUser));
    setIsSubmit(true);
    if (Object.keys(signInErr).length === 0 && isSubmit) {
      console.log("I am going to submit");
      registerUser();
    }
  };

  const validateForm = (signInUser) => {
    const regex = /\S+@\S+\.\S+/;
    const errors = {};
    setCheckUserInput(true);
    if (!signInUser.email) {
      errors.email = "email is missing";
    } else {
      if (!regex.test(signInUser.email)) {
        errors.email = "email is not valid";
      }
    }
    if (!signInUser.password) {
      errors.password = "password is missing";
    }
    return errors;
  };

  const registerUser = async () => {
    try {
        const baseUrl = "http://localhost:3001"
      const response = await fetch(
        `${baseUrl}/users/signin`,
        {
          method: "POST",
          body: JSON.stringify(signInUser),
          headers: {
            "content-type": "application/json",
          },
        }
      );
      if (response.status !== 200) {
        const data = await response.json();
        console.log(data);
        setError(data.error);
        setTimeout(() => setError(""),2000)
      } else {
        const data = await response.json();
        console.log(data);
        setUser(data.user)
        localStorage.setItem("MyToken", data.token);
        // dispatch(setMyInfoAction(data.user))
        navigate("/home");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
          <Form
            onSubmit={handleSubmit}
            noValidate
            style={{
              textAlign: "left",
              width: "100%",
              padding: "30px 15px",
              border: "1px solid rgb(200,200,200)",
              display:loginPage === "registration" ? "none" : "block",
            }}
          >
            <p className="h1 text-center">Sign In</p>
            <p className="h1 text-center">{user?.email}</p>

            {error.length > 0 && <Alert severity="error">{error}</Alert>}
            

            {/* email field */}
            <Form.Group className="mb-2" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                onChange={(e) => handleChange(e)}
                value={signInUser.email}
                name="email"
               
                required
              />
              <Form.Text className="text-danger" align="left">
                {signInErr.email}
              </Form.Text>
            </Form.Group>

            {/* password field */}
            <Form.Group
              className="mb-2"
              controlId="formBasicPassword"
              style={{ position: "relative" }}
            >
              <Form.Label>Password</Form.Label>
              <Form.Control
                placeholder="Password"
                name="password"
                label="Password"
                value={signInUser.password}
                onChange={(e) => handleChange(e)}
                type={showPassword ? "text" : "password"}
               
                required
              />
              <span
                style={{
                  color: "black",
                  position: "absolute",
                  right: "10px",
                  top: "45px",
                  bottom: "0",
                }}
              >
                <MdOutlineVisibility
                  style={{ display: !showPassword ? "block" : "none" }}
                  onClick={() => setShowPassword(true)}
                />
                <MdOutlineVisibilityOff
                  style={{ display: showPassword ? "block" : "none" }}
                  onClick={() => setShowPassword(false)}
                />
              </span>
              <Form.Text className="text-danger" align="left">
                {signInErr.password}
              </Form.Text>
            </Form.Group>


            <div className="m-auto text-center">
              <Button
                type="submit"
                variant="outline-light"
                onClick={(e) => handleSubmit(e)}
              >
                Sign In
              </Button>
              <p   className="my-3">
                Not a member? <span className="text-blue pointer" onClick={() => setLoginPage("registration")}>Register</span>
              </p>
            </div>
          </Form>
     
  );
};

export default SignIn;
