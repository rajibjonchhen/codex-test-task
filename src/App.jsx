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
import allDevelopers from './getDevelopers/getDeveloper';

function App() {
  const [developers, setDevelopers] = useState([]);

  useEffect(()=>{
   setDevelopers(allDevelopers)
  },[])
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
      <MyNavbar/>
        <Routes>
          <Route path="/home" element={<Home/>} />
          <Route path="/" element={<Login />} />
          <Route path="/project/:projectId" element={<ProjectDetail />} />
          <Route path="/task/:taskId" element={<Task />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
