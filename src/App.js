import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./Pages/Home"
import Login from "./Pages/LogIn"
import './styles/App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path = "/Home" element = {<Home />} />
          <Route exact path = "/" element = {<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
