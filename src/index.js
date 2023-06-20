import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route  } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import Electronics from './pages/Electronics';
import Groceries from './pages/Groceries';




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Layout>
      <Routes>
        <Route path='/' element={<Groceries />} />
        <Route path='/clothes' element={<Home />} />
        <Route path='/electronics' element={<Electronics />} />
      
      </Routes>
    </Layout>
  </BrowserRouter>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
