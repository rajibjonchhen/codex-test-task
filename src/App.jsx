import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Login from './components/login/Login';
import Home from './components/home/Home';
import Detail from './components/detail/Detail';

function App() {
  return (
  

    <div className="App bg-dark text-white">
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home/>} />
          <Route path="/" element={<Login />} />
          <Route path="/detail/:projectId" element={<Detail />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
