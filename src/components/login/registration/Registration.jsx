import { useEffect, useState } from "react";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
// import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";


const Registration = ({ loginPage, setLoginPage }) => {
  //   const dispatch = useDispatch()
  const navigate = useNavigate();
  //   const role = useSelector(state => state.user.role)

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const [isSubmit, setIsSubmit] = useState(false);
  const [signUpErr, setSignUpErr] = useState({});
  const [checkUserInput, setCheckUserInput] = useState(false);

  const [signUpUser, setSignUpUser] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    repassword: "",
    role: "",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (Object.keys(signUpErr).length === 0 && isSubmit) {
      console.log("I am going to submit");
      registerUser();
    }
  }, [signUpErr]);

  useEffect(()=> {
    if(checkUserInput === true){
      setSignUpErr(validateForm(signUpUser))
    }
  },[signUpUser])
  

  const handleChange = (e) => {
    console.log("signUpUser", signUpUser);
    const { name, value } = e.target;
    setSignUpUser({ ...signUpUser, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSignUpErr(validateForm(signUpUser));
    setIsSubmit(true);
  };

  const validateForm = (signUpUser) => {
    const regex = /\S+@\S+\.\S+/;
    const errors = {};
    setCheckUserInput(true);
    if (!signUpUser.email) {
      errors.email = "email is missing";
    } else {
      if (!regex.test(signUpUser.email)) {
        errors.email = "Email is not valid";
      }
    }

    if (!signUpUser.password) {
      errors.password = "password is missing";
    }

    if (!signUpUser.repassword) {
      errors.repassword = "repassword is missing";
    } else if (signUpUser.repassword !== signUpUser.password) {
      errors.repassword = "password and repassword do not match";
    }

    if (!signUpUser.name) {
      errors.name = "name is missing";
    }
    if (!signUpUser.surname) {
      errors.surname = "surname is missing";
    }
    if (!signUpUser.role) {
      errors.role = "role is missing";
    }

    return errors;
  };

  const registerUser = async () => {
    try {
      const baseUrl = "http://localhost:3001"
      console.log(signUpUser);
      const response = await fetch(`${baseUrl}/users/register`, 
        {
          method: "POST",
          body: JSON.stringify(signUpUser),
          headers: {
            "content-type": "application/json",
          },
        }
      );
      if (response.status !== 200) {
        const data = await response.json();
        console.log(data);
        setError(data.error);
      } else {
        const data = await response.json();
        console.log(data);
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
              display:loginPage === "signIn" ? "none" : "block",
            }}
          >
            <p className="h1 text-center">Sign Up</p>

            {error.length > 0 && <Alert severity="error">{error}</Alert>}
            {/* name field */}
            <Form.Group className="mb-2">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter first name"
                onChange={(e) => handleChange(e)}
                value={signUpUser.name}
                name="name"
                id="name"
                required
              />
              <Form.Text className="text-danger" align="left">
                {signUpErr.name}
              </Form.Text>
            </Form.Group>

            {/* surname field */}
            <Form.Group className="mb-2">
              <Form.Label> Surname</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => handleChange(e)}
                value={signUpUser.surname}
                placeholder="Enter surname"
                name="surname"
                id="surname"
                required
              />
              <Form.Text className="text-danger" align="left">
                {signUpErr.surname}
              </Form.Text>
            </Form.Group>

            {/* email field */}
            <Form.Group className="mb-2" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                onChange={(e) => handleChange(e)}
                value={signUpUser.email}
                name="email"
                required
              />
              <Form.Text className="text-danger" align="left">
                {signUpErr.email}
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
                value={signUpUser.password}
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
                {signUpErr.password}
              </Form.Text>
            </Form.Group>

            {/* password field */}
            <Form.Group className="mb-2" style={{ position: "relative" }}>
              <Form.Label>Repassword</Form.Label>

              <Form.Control
                placeholder="Repassword"
                name="repassword"
                label="Repassword"
                value={signUpUser.repassword}
                onChange={(e) => handleChange(e)}
                type={showPassword ? "text" : "password"}
                id="repassword"
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
              {signUpErr.repassword}
              </Form.Text>
            </Form.Group>

            {/* role field */}
            <Form.Group className="mb-2">
              <Form.Label id="demo-simple-select-label">Role </Form.Label>
              {["manager", "developer"].map((category, i) => (
                  <Form.Label key={i}
                    className=" d-flex justify-content-start align-items-center"
                    id="demo-simple-select-label"
                  >
                    <Form.Check
                      className="mx-2"
                      key={i}
                      type="radio"
                      name="role"
                      id={category}
                      value={category}
                      onChange={(e) => handleChange(e)}
                      checked={signUpUser.role === category}
                    />
                    {category}
                  </Form.Label>
                
              ))}
              <Form.Text className="text-danger" align="left">
                {signUpErr?.role}
              </Form.Text>
            </Form.Group>

            <div className="m-auto text-center">
            <Button
                type="submit"
                variant="outline-light"
                onClick={(e) => handleSubmit(e)}
              >
                Register
              </Button>
              <p className="my-3">
                Already a member? <span className="text-blue pointer" onClick={() => setLoginPage("signIn")}>Sign In</span>
              </p>
            </div>
          </Form>
  );
};

export default Registration;
