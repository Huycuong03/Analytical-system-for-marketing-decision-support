import './App.css';
import { useState } from "react";
import { Routes, Route, Link, useNavigate} from "react-router-dom";
import Home from "./components/Home"
import Login from "./components/Login"

function App() {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()
  return (
    <div className="App">
        {user && <nav>
        <Link to="/">Home</Link>
        <div><button onClick={() => {document.cookie = "token=; Max-Age=-99999999; path=/;"; setUser(null); navigate("/login")}}>Log out</button></div>
        </nav>}
        <Routes>
          <Route path="/" element={<Home user={user}/>}/>
          <Route path="/login" element={<Login setUser={setUser} navigate={navigate}/>}/>
      </Routes>
    </div>
  );
}

export default App;