import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Login from './components/login/Login';
import Home from './components/home/Home';
import ProjectDetail from './components/detail/ProjectDetail';
import Task from './components/detail/TaskDetail';
import MyNavbar from './components/myNavbar/MyNavbar';
import { useEffect, useState } from 'react';

function App() {
  const [developers, setDevelopers] = useState([]);
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
  
    <div className="App bg-dark text-white" style={{minHeight:"100vh"}}>
      <BrowserRouter>
      <div>
        {/* <select className="form-control" style={{width:"200px", margin:"10px"}}> */}
          {developers.map(developer => (
            <p key={developer._id} value={developer._id}>{developer.name}</p>
          ))}
        {/* </select> */}
      </div>
      <MyNavbar user={user}/>
        <Routes>
          <Route path="/home" element={<Home user={user}/>} />
          <Route path="/" element={<Login />} />
          <Route path="/project/:projectId" element={<ProjectDetail />} />
          <Route path="/task/:taskId" element={<Task />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
