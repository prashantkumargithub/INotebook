import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from './components/Navbar';
import About from './components/About';
import Home from './components/Home';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import Singup from './components/Singup';

function App() {
  //alert
  const [alert, setAlert] = useState(null);
  const showAlert = (message,type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  }
  return (
    <NoteState>
      <Router>
        <Navbar />
        <Alert alert={alert}/>
        <div className="container">
          <Routes>
            <Route exact path='/' element={<Home showAlert={showAlert} />}></Route>
            <Route exact path='/About' element={<About />}></Route>
            <Route exact path='/login' element={<Login showAlert={showAlert} />}></Route>
            <Route exact path='/signup' element={<Singup showAlert={showAlert} />}></Route>
          </Routes>
        </div>
      </Router>
    </NoteState>
  )
};

export default App;
