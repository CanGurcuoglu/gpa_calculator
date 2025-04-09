import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home.jsx';
import ModeSelection from './ModeSelection.jsx';
import App from './App.jsx';
import ExistingGPA from './ExistingGPA.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/gpa-mode/:major" element={<ModeSelection />} />
      <Route path="/gpa/new/:major" element={<App />} />
      <Route path="/gpa/existing/:major" element={<ExistingGPA />} />
    </Routes>
  </BrowserRouter>
);