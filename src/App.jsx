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
import ConfirmationPage from './components/login/confirmation/ConfirmationPage';
import PendingVerification from './components/login/confirmation/PendingVerification';
import MyLayout from './components/myLayout/MyLayout';


function App() {
  const [developers, setDevelopers] = useState([]);
  const [user, setUser] = useState(null)
    const [error, setError] = useState(null)

    // useEffect(() => {
    //     fetchUser()
    // }, [])

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
      {/* <MyNavbar user={user}/> */}
        <Routes>
          <Route path="/home" element={<MyLayout  user={user}><Home user={user} fetchUser={fetchUser}/></MyLayout>} />
          <Route path="/" element={<Login />} />
          <Route path="/project/:projectId" element={<MyLayout  user={user}><ProjectDetail /></MyLayout>} />
          <Route path="/task/:taskId" element={<MyLayout user={user}><Task /></MyLayout>} />
          <Route path="/confirm/:userId" element={<ConfirmationPage />} />
          <Route path="/pendingVerification" element={<PendingVerification/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
