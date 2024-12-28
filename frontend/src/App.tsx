import React from 'react';
import HomePage from './components/HomePage/Homepage';
import LogInPage from './components/LogInPage/LogInPage'
import RegisterPage from './components/RegisterPage/RegisterPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LogInPage />} />
        <Route path='/register' element={<RegisterPage />}/>
      </Routes>
    </Router>
  );
}

export default App;
