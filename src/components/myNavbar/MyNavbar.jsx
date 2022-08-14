import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

function MyNavbar() {
    const [user, setUser] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        fetchUser()
    }, [])

    const fetchUser = async () => {
        try {
            const response = await fetch('http://localhost:3001/users/me', {
                method: 'GET',
                headers: {
                    authorization: localStorage.getItem('MyToken')
                }
            })
            if (response.status !== 200) {
                const data = await response.json()
                setError(data.message)
            } else{
                const data = await response.json()
                console.log(data)
                setUser(data.user)  
            }
        } catch (error) {
            console.log(error)
        }   
        
    }
    
  return (
    
    <Navbar className="border-bottom" bg="dark" variant="dark" style={{position:"sticky", top:'0', zIndex:"1"}}>
    <Container>
      <Navbar.Brand>
            <Link to="/home" style={{color:"white", textDecoration:"none"}}>
                Codex Software
            </Link>
      </Navbar.Brand>
      <div className="nav-link d-flex">
        <img src={user.image || `https://ui-avatars.com/api/?name=${user.name}+${user.surname}`} alt="user" className="rounded-circle" style={{width:"40px", height:"40px"}} />
        <div>
            <p className="mx-2" style={{color:"white", fontSize:"14px"}}>{user.name} {user.surname}
            <br/>
            <span>{user.role}</span>
            </p>
        </div>
      </div>
    </Container>
  </Navbar>
  );
}

export default MyNavbar;