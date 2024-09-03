import logo from './logo.svg';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Header from './component/header';
import Home from './pages/Home';
import AddEdit from './pages/AddEdit';
import View from './pages/View';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style/css/style.css';



function App() {
  return (
    <Router>
        <div className='App'>
          <Header/>
          <Routes>
            <Route exact path="/" Component={Home}/>
            <Route exact path="/add" Component={AddEdit}/>
            <Route exact path="/update/:id" Component={AddEdit}/>
            <Route exact path="/view/:id" Component={View}/>
          </Routes>
          <ToastContainer />
        </div>
    </Router>

  );
}

export default App;
