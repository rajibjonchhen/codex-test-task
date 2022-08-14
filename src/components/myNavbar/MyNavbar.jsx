import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

function MyNavbar() {
  return (
    
    <Navbar className="border-bottom" bg="dark" variant="dark" style={{position:"sticky", top:'0', zIndex:"1"}}>
    <Container>
      <Navbar.Brand>
            <Link to="/home" style={{color:"white", textDecoration:"none"}}>
                Codex Software
            </Link>
      </Navbar.Brand>
    </Container>
  </Navbar>
  );
}

export default MyNavbar;