import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./Pages/Home"
import Login from "./Pages/LogIn"
import './styles/App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path = "/" element = {<Login />} />
          <Route path = "/Home" element = {<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
