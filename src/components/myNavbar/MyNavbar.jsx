import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useLocation } from 'react-router-dom';

function MyNavbar({user}) {
    const location = useLocation();
    
    
  return (
    
    <Navbar className="border-bottom" bg="dark" variant="dark" style={{position:"sticky", top:'0', zIndex:"1"}}>
    <Container>
      <Navbar.Brand>
            <Link to="/home" style={{color:"white", textDecoration:"none"}}>
                Codex Software
            </Link>
      </Navbar.Brand>
      {user && <div className="nav-link" style={{display:location.pathname ==="/"? "none":"flex"}}>
        <img src={user?.image || `https://ui-avatars.com/api/?name=${user?.name}+${user?.surname}`} alt="user" className="rounded-circle" style={{width:"40px", height:"40px"}} />
        <div>
            <p className="mx-2" style={{color:"white", fontSize:"14px"}}>{user?.name} {user?.surname}
            <br/>
            <span>{user.role}</span>
            </p>
        </div>
      </div>}
    </Container>
  </Navbar>
  );
}

export default MyNavbar;