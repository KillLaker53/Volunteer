import React from 'react';
import HomePage from './components/HomePage/Homepage';
import LogInPage from './components/LogInPage/LogInPage'
import RegisterPage from './components/RegisterPage/RegisterPage';
import EventPage from './components/EventPage/EventPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProfilePage from './components/ProfilePage/ProfilePage';
import CreateEventPage from './components/CreateEventPage/CreateEventPage';
import AdminPage from './components/AdminPage/AdminPage';


function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LogInPage />} />
        <Route path='/register' element={<RegisterPage />}/>
        <Route path='/event/:eventId' element={<EventPage />} />
        <Route path='/profile/:userId' element={<ProfilePage />}/>
        <Route path='/createEvent' element={<CreateEventPage />}/>
        <Route path='/admin' element={<AdminPage />} />
      </Routes>
    </Router>
  );
}

export default App;
